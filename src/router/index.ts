import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import RocketDetailPage from '../pages/rocket/[id].vue'

const routes = [
  {
    path: '/',
    name: 'rocket-list',
    component: IndexPage,
  },
  {
    path: '/rocket/:id',
    name: 'rocket-detail',
    component: RocketDetailPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
