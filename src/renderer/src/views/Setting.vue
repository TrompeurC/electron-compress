<script setup lang="ts">
import Card from '@renderer/components/Card.vue'
import FrameSizeSet from '@renderer/components/FrameSizeSet.vue';
import useConfigStore from '@renderer/store/useConfigStore';

const config = useConfigStore()

</script>

<template>
  <Card title="分辨率" class="mt-2">
    <FrameSizeSet type="size" tip="请输入分辨率" placeholder="请选择分辨率" :list="config.dips" />
  </Card>
  <Card title="帧数" class="mt-2">
    <FrameSizeSet type="size" tip="请输入帧数" placeholder="请选择帧数" :list="config.sizes" />
  </Card>
</template>

<style scoped></style>
