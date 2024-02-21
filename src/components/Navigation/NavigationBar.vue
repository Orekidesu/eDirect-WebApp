<template>
  <nav class="border-b-[#070F2C] dark:bg-[#1B1A56] text-gray-200 dark:text-white h-16   ">
    <!-- <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> -->
    <div
      :class="route.name !== 'login' && route.name !== 'signup' ? ' max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4' : ' w-screen max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4'">
      <a v-if="route.name !== 'login'" href="" class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">eDirect</span> -->

        <span
          :class="route.name !== 'login' && route.name !== 'signup' ? 'self-center text-2xl font-semibold whitespace-nowrap dark:text-white' : 'self-center text-2xl font-semibold whitespace-nowra text-gray-900'">eDirect</span>
      </a>

      <div class="flex items-center">
        <button class="flex items-center mr-10" @click="toggleDarkMode">
          <span v-if="!darkMode" class="material-symbols-outlined text-slate-800  dark:text-white mr-10">dark_mode</span>
          <span v-else class="material-symbols-outlined  text-slate-800  dark:text-white mr-10">light_mode</span>
        </button>
        <div v-if="route.name !== 'login' && route.name !== 'signup'"
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button"
            class="flex items-center text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <span class="material-symbols-outlined text-3l ">
              person
            </span>
          </button>

          <!-- Dropdown menu -->
          <div
            class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{ user?.username }}</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ user?.email }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <div class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <button @click="handleSignOut"
                    class="text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white w-full text-left">
                    Sign out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>


<script setup lang = 'ts'>
import { onMounted, ref, defineExpose, Ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { useRoute, useRouter } from 'vue-router'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/init.ts';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
let body: HTMLElement | null;
let darkMode = ref(getDarkMode());



let user: Ref<DocumentData | null> = ref(null);

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    const docRef = doc(db, 'users', currentUser.uid);
    getDoc(docRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        user.value = docSnapshot.data();
      }
    });
  }
});

const handleSignOut = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, sign out!',
    width: '300px',
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          console.log('User signed out');
          router.push({ name: 'login' });
        })
        .catch((error) => {
          console.log('Error signing out: ', error);
        });
    }
  })
};

onMounted(() => {
  body = document.querySelector('body');
  initFlowbite();
  body?.classList.toggle('dark', darkMode.value);
})


function getDarkMode() {
  const savedDarkMode = localStorage.getItem('darkMode');
  const hasSavedDarkMode = typeof savedDarkMode === 'string';
  const isDark = body && body.classList.contains('dark');
  return hasSavedDarkMode ? savedDarkMode === 'true' : isDark ?? false;
}


function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', String(darkMode.value));
  if (body) {
    body.classList.toggle('dark', darkMode.value);
  }
}

defineExpose({
  toggleDarkMode,
  handleSignOut,
});

</script>