<template>
  <div id="app">
    <router-view />
    <GuestWelcomeModal />
  </div>
</template>

<script setup lang="ts">
import GuestWelcomeModal from './components/GuestWelcomeModal.vue'
// C端用户系统 - 完全独立的应用
</script>

<style>
/* 重置样式，确保完全独立 */
* {
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>
