import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/work/:id',
    name: 'work-detail',
    component: () => import('@/pages/work-detail/index.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/contact/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
