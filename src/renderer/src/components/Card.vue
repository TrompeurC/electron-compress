<script setup lang="ts">

const props = defineProps<{
  title: string

}>()

</script>

<template>
  <div class="px-2">
    <div class="bg-white rounded-xl py-3 px-2">
      <h2>{{ props.title }}</h2>
      <slot />
    </div>
  </div>
</template>

<style scoped>
h2 {
  @apply text-sm text-slate-500;
}
</style>
