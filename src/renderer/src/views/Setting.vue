<script setup lang="ts">
import Card from '@renderer/components/Card.vue'
import FrameSizeSet from '@renderer/components/FrameSizeSet.vue';
import useConfigStore from '@renderer/store/useConfigStore';
import { SeoFolder } from '@icon-park/vue-next'
import useCurrentStore from '@renderer/store/useCurrentStore';

const config = useConfigStore()

const current = useCurrentStore()

const handleSelectDirectory = async () => {
  const res = await window.api.selectDirectory()
  if (res) current.directory = res
}

</script>

<template>
  <Card title="分辨率" class="mt-2">
    <FrameSizeSet type="size" tip="请输入分辨率" placeholder="请选择分辨率" :list="config.dips" />
  </Card>
  <Card title="帧数" class="mt-2">
    <FrameSizeSet type="size" tip="请输入帧数" placeholder="请选择帧数" :list="config.sizes" />
  </Card>
  <Card title="存储位置" class="mt-2">
    <a-input v-model:value="current.directory" readonly>
      <template #addonAfter>
        <seo-folder class="cursor-pointer" @click="handleSelectDirectory" theme="outline" size="24" fill="#333" />
      </template>
    </a-input>
  </Card>
</template>

<style scoped></style>
