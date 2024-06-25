import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore('current', () => {
  const fps = ref('')
  const size = ref('')
  const directory = ref('')
  return {
    fps,
    size,
    directory,
  }
}, {
  persist: true
})
