import { ConfigProps } from './../types/index';
import { defineStore } from "pinia";
import { ref } from "vue";
import { message } from 'ant-design-vue'



export default defineStore('config', () => {
  const sizes  = ref(['1920x1080', '1024x720'])
  const dips = ref(['30', '60', '120'])

  const add = (type: ConfigProps, val: string) => {
    if(!val) {
      message.warn('请输入内容！')
      return false
    }
    (type === 'size' ? dips : sizes).value.push(val)
    message.success('新增成功！')
    return true
  }

  const remove = (type: ConfigProps ,index: number , ) => {
    (type === 'size' ? dips : sizes).value = (type === 'size' ? dips : sizes).value.filter((_, idx) => idx !== index)
  }

  return {
    add,
    sizes,
    dips,
    remove
  }
}, {
  persist: true
})
