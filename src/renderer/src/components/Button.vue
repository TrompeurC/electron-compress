<script setup lang="ts">
import { UpdateRotation } from "@icon-park/vue-next";
import { PlusOutlined } from "@ant-design/icons-vue";
import useFileList from "@renderer/store/useFileList";
import { message } from "ant-design-vue";
import useCurrentStore from "@renderer/store/useCurrentStore";
import { onMounted, ref } from "vue";
import { IFile } from "@renderer/types";
import { FileEnum, ProgressType } from "@renderer/types";
import { storeToRefs } from "pinia";
import useRunStore from "@renderer/store/useRunStore";

const { addFile, } = useFileList();
const { files } = storeToRefs(useFileList())
const current = useCurrentStore()
const currentFile = ref<IFile | null>(null)

const handleCustomRequest = ({ file }) => {
  file = {
    filename: file.name,
    filepath: file.path,
  };
  addFile(file);
};

onMounted(() => {
  // console.log(window.api)
  window.api.progressNotice((type: ProgressType, data: any) => {
    switch (type) {
      case ProgressType.PROGRESS:
        currentFile.value!.progress = data.progress
        isRun.value = true;
        break;
      case ProgressType.END:
        currentFile.value!.status = FileEnum.DONE
        currentFile.value!.finished = true
        isRun.value = false;
        handleCompress()
        break;
      case ProgressType.ERROR:
        currentFile.value!.status = FileEnum.ERROE
        isRun.value = false;
        message.warn(data.error)
        break;
      case ProgressType.CHECK_DIRECTORY:
        message.warn('存储文件夹不存在！')
        break;
      case ProgressType.STOP:
        currentFile.value!.status = FileEnum.STOP
        isRun.value = false;
        break;
    }
  })
})

const { isRun } = storeToRefs(useRunStore())

// window.api.progress((progress: number) => {
//   currentFile.value!.progress = progress
// })


const getCurrentFile = () => {
  const f = files.value.find(item => item.status === FileEnum.READY)
  if (f) {
    currentFile.value = f;
    currentFile.value.progress = 0
    currentFile.value.status = FileEnum.READY
  } else {
    currentFile.value = null
    message.success('所有文件已压缩完成！')
    isRun.value = false;
  }
}

// 开始压缩
const handleCompress = () => {
  if (isRun.value) return
  if (!current.size) {
    message.warn('请选择帧数！')
  }
  if (!current.fps) {
    message.warn('请选择分辨率！')
  }
  if (!files.value.length) {
    message.warn('请添加要压缩的文件！')
    return
  }
  if (!current.directory) {
    message.warn('请选择存放的文件位置！')
    return
  }
  files.value.forEach(item => {
    if (item.status === FileEnum.STOP) {
      item.status = FileEnum.READY
      item.progress = 0
    }
  })
  getCurrentFile()
  if (currentFile.value) {
    currentFile.value.status = FileEnum.COMPRESS
    currentFile.value.progress = 0
    window.api.compress({ ...currentFile.value, size: current.size, fps: Number(current.fps), directory: current.directory })
  }
}

</script>

<template>
  <div class="flex justify-center gap-6">
    <span class="button">
      <!-- <Plus theme="outline" size="40" fill="#666" /> -->
      <a-upload name="videos" :customRequest="handleCustomRequest" accept="video/*" list-type="picture-card"
        class="avatar-uploader" multiple :show-upload-list="false">
        <div>
          <plus-outlined></plus-outlined>
          <div class="ant-upload-text">上传</div>
        </div>
      </a-upload>
    </span>

    <span class="button">
      <div class="h-[100px] w-[100px] flex justify-center items-center">
        <UpdateRotation @click="handleCompress" theme="outline" :class="isRun ? 'spin' : ''" size="40"
          :fill="isRun ? '#ccc' : '#666'" />
      </div>
    </span>
  </div>
</template>

<style scoped>
.button {
  @apply bg-white p-2 rounded-lg cursor-pointer;
}

.spin {
  @apply animate-spin text-gray-300
}
</style>
