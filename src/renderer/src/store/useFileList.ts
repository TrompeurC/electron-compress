import { IFile } from "@renderer/types"
import { defineStore } from "pinia"
import { FileEnum } from "src/types"
import { ref } from "vue"
import useCurrentStore from "./useCurrentStore"

export default defineStore('fileList', () => {
    const files = ref<IFile[]>([])
    const current = useCurrentStore()
    const addFile = (file:Omit<IFile , 'finished' | 'progress'>) => {
      files.value.push({
        ...file,
        progress: 0,
        finished: false,
        status: FileEnum.READY,
        size: current.size,
        fps: Number(current.fps),
        directory: current.directory
      })
    }
    const remove = (index: number) => {
      files.value = files.value.filter((_, idx) => index !== idx)
    }

    const removeAll = () => {
      files.value = []
    }

    const resetAll = () => {
      files.value.forEach(item => {
        item.progress = 0;
        item.finished = false;
        item.status = FileEnum.READY
      })
    }

    return {
      files,
      addFile,
      removeAll,
      remove,
      resetAll
    }
})
