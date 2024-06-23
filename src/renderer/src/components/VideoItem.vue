<script lang="ts" setup>
import { CloseCircleFilled } from "@ant-design/icons-vue";
import { IFile } from "@renderer/types";
import { computed } from "vue";

const props = defineProps<{
  file: IFile
}>()

const progress = computed(() => props.file.progress)

</script>

<template>
  <div class=" cover  px-2  relative z-10 bg-white mt-2 rounded-lg py-2">
    <div class=" flex gap-2  justify-between items-center">
      <span class=" px-2 flex-1 truncate   text-gray-700">
        {{ props.file.filename }}</span>
      <span class="hover:text-red-500 hover:scale-125 duration-300 cursor-pointer">
        <CloseCircleFilled />
      </span>
    </div>
  </div>
</template>

<style scoped>
.cover::before {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-[#52c41a] rounded-lg z-[-1];
  ;
  width: v-bind(progress + '%');
}
</style>
