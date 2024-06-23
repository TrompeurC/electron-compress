<script setup lang='ts'>

</script>

<template>
  <div class="bg-white text-sm flex justify-end gap-2 px-2 py-1 text-gray-500">
    <span class="cursor-pointer" @click="$router.push({ name: 'home' })">转码</span>
    <span class="cursor-pointer" @click="$router.push({ name: 'setting' })">配置</span>
  </div>
</template>


<style scoped></style>
