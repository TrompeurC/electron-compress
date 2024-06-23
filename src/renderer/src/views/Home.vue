<script setup lang="ts">
import Button from '@renderer/components/Button.vue';
import Actions from '@renderer/components/Actions.vue';
import Operate from '@renderer/components/Operate.vue';
import VideoList from '@renderer/components/VideoList.vue';


</script>

<template>
  <main>
    <Actions class="mt-5 gap-3" />
    <Button class="mt-5" />
    <Operate class="gap-2 mt-5"></Operate>
    <VideoList class="mt-2"></VideoList>
  </main>
</template>

<style scoped></style>
