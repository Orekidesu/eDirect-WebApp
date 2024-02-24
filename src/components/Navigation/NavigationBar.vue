<template>
  <nav class=" border border-t-0 border-x-0 border-b h-16 bg-primary text-primary-foreground ">
    <!-- <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> -->
    <div
      :class="route.name !== 'login' && route.name !== 'signup' ? ' max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4' : ' w-screen max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4'">
      <a v-if="route.name !== 'login' && route.name !== 'signup'" href=""
        class="flex items-center space-x-3 rtl:space-x-reverse">
        <span
          :class="route.name !== 'login' && route.name !== 'signup' ? 'self-center text-2xl font-semibold whitespace-nowrap  ' : 'self-center text-2xl font-semibold whitespace-nowra'">eDirect</span>

      </a>

      <div class="flex items-center">
        <button class="flex items-center mr-10" @click="toggleDarkMode">
          <span v-if="!darkMode" class="material-symbols-outlined  mr-10">dark_mode</span>
          <span v-else class="material-symbols-outlined   mr-10">light_mode</span>
        </button>
        <div v-if="route.name !== 'login' && route.name !== 'signup'"
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" class="flex items-center text-sm rounded-full md:me-0 focus:ring-4" id="user-menu-button"
            aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <span class="material-symbols-outlined text-3l ">
              person
            </span>
          </button>

          <!-- Dropdown menu -->
          <div
            class="z-50 hidden my-4 text-base list-none bg-secondary text-secondary-foreground divide-y  rounded-lg shadow"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm ">{{ user?.username }}</span>
              <span class="block text-sm   truncate ">{{ user?.email }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <div class="block px-4 py-2 hover:bg-primary hover:text-primary-foreground ">
                  <button @click="handleSignOut" class="text-sm w-full text-left">
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