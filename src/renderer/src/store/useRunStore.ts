import { defineStore } from "pinia";
import { ref } from "vue";


export default defineStore('run', () => {
  const isRun = ref(false)
  return {
    isRun
  }
},)
