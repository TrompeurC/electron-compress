import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')
