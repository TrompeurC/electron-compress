<script setup lang="ts">
import useConfigStore from '@renderer/store/useConfigStore';
import useCurrentStore from '@renderer/store/useCurrentStore'
import { toRefs } from 'vue';

const config = useConfigStore()
const { size, fps } = toRefs(useCurrentStore())

</script>

<template>
  <div class="flex px-2 py-2 bg-white">
    <a-select v-model:value="fps" class="select">
      <a-select-option :value="item" v-for="item of config.dips" :key="item">{{ item }}</a-select-option>
    </a-select>
    <a-select v-model:value="size" class="select">
      <a-select-option :value="item" v-for="item of config.sizes" :key="item">{{ item }}</a-select-option>
    </a-select>
  </div>
</template>

<style scoped>
.select {
  @apply flex-1;
}
</style>
