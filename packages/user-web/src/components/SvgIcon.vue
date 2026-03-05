<template>
  <svg :class="svgClass" :style="{ width: size, height: size }" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: string
  color?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '24px',
  color: 'currentColor',
  className: ''
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  return props.className ? `svg-icon ${props.className}` : 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
