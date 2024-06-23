import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore('current', () => {
  const fps = ref('')
  const size = ref('')

  return {
    fps,
    size
  }
}, {
  persist: true
})
