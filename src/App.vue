<script setup lang="ts">
// import { computed } from 'vue'
// import { useRoute } from 'vue-router'
import NavigationBar from './components/Navigation/NavigationBar.vue'

// const route = useRoute()
// const routeName = computed(() => route.name)
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