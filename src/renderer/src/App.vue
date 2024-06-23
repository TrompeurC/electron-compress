<script setup lang="ts">
import Navbar from './components/Navbar.vue';

</script>

<template>
  <main class="bg-slate-100 w-screen h-screen">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
