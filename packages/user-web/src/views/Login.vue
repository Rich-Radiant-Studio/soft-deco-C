<template>
  <div class="login-page">
    <AuthModal :visible="true" initial-mode="login" @update:visible="handleClose" @login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AuthModal from '@/components/AuthModal.vue'

const router = useRouter()
const route = useRoute()
const returnTo = () => typeof route.query.returnTo === 'string' && route.query.returnTo.startsWith('/') ? route.query.returnTo : '/'
const handleClose = () => router.push('/')
const handleLogin = () => router.push(returnTo())
</script>

<style scoped>
.login-page { min-height: 100vh; background: #f6f7f9; }
</style>
