<script setup lang="ts">
import useFileList from '@renderer/store/useFileList';


const { removeAll } = useFileList()

</script>

<template>
  <div class="flex justify-center">
    <a-button ghost type="primary" size="small">停止转码</a-button>
    <a-button ghost type="primary" size="small" @click="removeAll" danger>删除全部</a-button>
  </div>
</template>

<style scoped></style>
