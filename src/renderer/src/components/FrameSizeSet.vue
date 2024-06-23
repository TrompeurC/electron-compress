<script setup lang="ts">
import useConfigStore from '@renderer/store/useConfigStore';
import { ConfigProps } from '@renderer/types';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue';

const props = defineProps<{
  type: ConfigProps
  list: string[]
  placeholder?: string
  tip?: string
  iconTip?: string
}>()

const { add, remove } = useConfigStore();
const newVal = ref('')

const handleClick = (type: ConfigProps, val: string) => {
  if (add(type, val)) newVal.value = ''
}

</script>

<template>
  <div>
    <div class="select">
      <a-select class="w-full" :placeholder="props.placeholder">
        <a-select-option :value="item" v-for="(item, index) of list" :key="item">
          <div class="flex justify-between">
            <span>{{ item }}</span>
            <span>
              <DeleteOutlined @click.stop="remove(props.type, index)" v-if="index > 1"
                class="hover:text-red-500 hover:scale-125 duration-300" />
            </span>
          </div>
        </a-select-option>
      </a-select>
      <div class="flex gap-2 mt-2 items-center">
        <a-input-group compact>
          <a-input :placeholder="props.tip" v-model:value="newVal" style="width: calc(100% - 32px)" />
          <a-tooltip :title="props.iconTip">
            <a-button @click="handleClick(props.type, newVal)">
              <template #icon>
                <PlusCircleOutlined />
              </template>
            </a-button>
          </a-tooltip>
        </a-input-group>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
