import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "@renderer/views/Home.vue";
import Setting from "@renderer/views/Setting.vue";


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.url),
  routes: routes,
})


export default router;
