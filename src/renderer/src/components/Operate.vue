<script setup lang="ts">
import useFileList from "@renderer/store/useFileList";
import { storeToRefs } from "pinia";
import useRunStore from "@renderer/store/useRunStore";

const { removeAll, resetAll } = useFileList();

const { isRun } = storeToRefs(useRunStore());

const handleStop = () => {
  window.api.stop()
}
</script>

<template>
  <div class="flex justify-center">
    <a-button ghost type="primary" :disabled="!isRun" @click="handleStop" size="small">停止转码</a-button>
    <a-button
      ghost
      type="primary"
      size="small"
      :disabled="isRun"
      @click="removeAll"
      danger
      >删除全部</a-button
    >
    <a-button ghost type="primary" size="small" :disabled="isRun" @click="resetAll"
      >重置视频</a-button
    >
  </div>
</template>

<style scoped></style>
