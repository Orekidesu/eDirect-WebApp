<template>
  <nav class="bg-gray-900 border-gray-200 dark:bg-gray-900 text-white h-16  ">
    <!-- <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> -->
    <div
      :class="route.name !== 'login' ? 'max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4' : 'max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4'">
      <a v-if="route.name !== 'login'" href="" class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">eDirect</span> -->

        <span
          :class="route.name !== 'login' ? 'self-center text-2xl font-semibold whitespace-nowrap dark:text-white' : 'self-center text-2xl font-semibold whitespace-nowra text-gray-900'">eDirect</span>
      </a>

      <div class="flex items-center">
        <button class="flex items-center mr-10" @click="toggleDarkMode">
          <span v-if="!darkMode"
            class="material-symbols-outlined text-slate-800 text-white dark:text-white mr-10">dark_mode</span>
          <span v-else
            class="material-symbols-outlined  text-slate-800 text-white dark:text-white mr-10">light_mode</span>
        </button>
        <div v-if="route.name !== 'login'"
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
              <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <router-link to="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </router-link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>


<script setup lang = 'ts'>
import { onMounted, ref, defineExpose } from 'vue'
import { initFlowbite } from 'flowbite'
import { useRoute } from 'vue-router'

const route = useRoute()
const darkMode = ref(getDarkMode());

const body = document.querySelector('body');

function getDarkMode() {
  // Try to get the dark mode setting from localStorage
  const storedDarkMode = localStorage.getItem('darkMode');

  // If the setting exists, return it (converted to a boolean)
  if (storedDarkMode !== null) {
    return storedDarkMode === 'true';
  }

  // Otherwise, determine the setting based on the body class
  const isDark = body?.classList.contains('dark');
  return isDark ?? false;
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value;

  // Store the new setting in localStorage
  localStorage.setItem('darkMode', darkMode.value.toString());

  body?.classList.toggle('dark', darkMode.value);
}

defineExpose({
  toggleDarkMode,
});
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
  body?.classList.toggle('dark', darkMode.value);
})

</script>