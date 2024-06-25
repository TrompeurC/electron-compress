<script lang="ts" setup>
import { CloseCircleFilled } from "@ant-design/icons-vue";
import useFileList from "@renderer/store/useFileList";
import { IFile } from "@renderer/types";
import { storeToRefs } from "pinia";
import { FileEnum } from "@renderer/types";
import { computed } from "vue";
import useRunStore from "@renderer/store/useRunStore";
import { message } from "ant-design-vue";

const props = defineProps<{
  file: IFile
  index: number
}>()

const progress = computed(() => props.file.progress + '%')

const { isRun } = storeToRefs(useRunStore())

const status = computed(() => {
  return {
    [FileEnum.READY]: '',
    [FileEnum.COMPRESS]: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    [FileEnum.ERROE]: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);',
    [FileEnum.DONE]: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);',
    [FileEnum.STOP]: 'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);',
  }[props.file.status]
})

const { remove } = useFileList()
const handleRemove = (index: number) => {
  if (!isRun.value) {
    remove(index)
  } else {
    message.warn('正在压缩，请稍等！')
  }
}
console.log(progress.value)


</script>

<template>
  <div class=" cover  px-2  relative z-10 bg-white mt-2 rounded-lg py-2" :style="`--bg-color:${status}`">
    <div class=" flex gap-2  justify-between items-center h-full">
      <span class=" px-2 flex-1 truncate   text-gray-700">
        {{ props.file.filename }}</span>
      <span class="hover:text-red-500 hover:scale-125 duration-300 cursor-pointer">
        <CloseCircleFilled @click="handleRemove(props.index)" class="flex items-center" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.cover::before {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 rounded-lg z-[-1] duration-1000;
  ;
  width: v-bind(progress);
  background: var(--bg-color);
}
</style>
