<script setup lang="ts">
import { UpdateRotation } from "@icon-park/vue-next";
import { PlusOutlined } from "@ant-design/icons-vue";
import useFileList from "@renderer/store/useFileList";
import { message } from "ant-design-vue";
import useCurrentStore from "@renderer/store/useCurrentStore";
import { onMounted, ref } from "vue";
import { IFile } from "@renderer/types";
import { FileEnum } from "src/types";

const { addFile, files } = useFileList();
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
  window.api.progress((progress: number) => {
    currentFile.value!.progress = progress
  })
})

// window.api.progress((progress: number) => {
//   currentFile.value!.progress = progress
// })

const getCurrentFile = () => {
  const f = files.find(item => !item.finished)
  if (f) {
    currentFile.value = f;
    currentFile.value.status = FileEnum.COMPRESS
  } else {
    currentFile.value = null
    message.success('所有文件已压缩完成！')
  }
}

// 开始压缩
const handleCompress = () => {
  if (!current.size) {
    message.warn('请选择帧数！')
  }
  if (!current.fps) {
    message.warn('请选择分辨率！')
  }
  if (!files.length) {
    message.warn('请添加要压缩的文件！')
    return
  }
  if (!current.directory) {
    message.warn('请选择存放的文件位置！')
    return
  }
  getCurrentFile()
  if (currentFile.value) {
    window.api.compress({ ...currentFile.value, size: current.fps, fps: Number(current.size), directory: current.directory })

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
        <UpdateRotation @click="handleCompress" theme="outline" size="40" fill="#666" />
      </div>
    </span>
  </div>
</template>

<style scoped>
.button {
  @apply bg-white p-2 rounded-lg cursor-pointer;
}
</style>
