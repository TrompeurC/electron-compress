<script setup lang="ts">
// import { ref } from 'vue';
import useFileList from '@renderer/store/useFileList';
import VideoItem from './VideoItem.vue';
import { storeToRefs } from 'pinia';

const { files } = storeToRefs(useFileList())

// const list = ref([])
</script>

<template>
  <div class="px-2 h-72 overflow-auto">
    <VideoItem v-for="(item, index) of files" :key="index" :index="index" :file="item"></VideoItem>
  </div>
</template>

<style scoped></style>
