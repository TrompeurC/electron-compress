import { IFile } from "@renderer/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore('fileList', () => {
    const files = ref<IFile[]>([])
    const addFile = (file:Omit<IFile , 'finished' | 'progress'>) => {
      files.value.push({
        ...file,
        progress: 0,
        finished: false
      })
    }
    const remove = (index: number) => {
      files.value = files.value.filter((_, idx) => index !== idx)
    }

    const removeAll = () => {
      files.value = []
    }

    return {
      files,
      addFile,
      removeAll,
      remove
    }

})
