<template>
  <div class="login-page">
    <AuthModal :visible="true" initial-mode="login" @update:visible="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthModal from '@/components/AuthModal.vue'

const router = useRouter()
const handleClose = () => router.push('/')
</script>

<style scoped>
.login-page { min-height: 100vh; background: #f6f7f9; }
</style>
