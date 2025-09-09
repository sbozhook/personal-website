<script setup lang="ts">
const props = defineProps<{
  name: string
  files?: string
}>()

// console.log(props.files, decodeURIComponent(props.files ?? ''))
// const parsedFiles = computed(() => props.files ? JSON.parse(decodeURIComponent(props.files ?? '')): null)
</script>

<template>
  <slot />
</template>
