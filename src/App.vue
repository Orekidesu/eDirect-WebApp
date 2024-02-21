<script setup lang="ts">
import NavigationBar from './components/Navigation/NavigationBar.vue'


</script>

<template>
  <div id="app">
    <!-- <NavigationBar v-if="routeName && routeName !== 'login'" /> -->
    <NavigationBar />
    <main class="main flex items-center justify-center w-100 h-100">
      <RouterView />
    </main>
  </div>
</template>