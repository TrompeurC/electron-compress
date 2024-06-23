<script setup lang="ts">
import { UpdateRotation } from "@icon-park/vue-next";
import { PlusOutlined } from "@ant-design/icons-vue";
import useFileList from "@renderer/store/useFileList";
import { message } from "ant-design-vue";
import useCurrentStore from "@renderer/store/useCurrentStore";

const { addFile, files } = useFileList();
const current = useCurrentStore()

const handleCustomRequest = ({ file }) => {
  file = {
    filename: file.name,
    filepath: file.path,
  };
  addFile(file);
};

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
  window.api.compress({ ...files[0], size: current.fps, fps: Number(current.size) })
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
