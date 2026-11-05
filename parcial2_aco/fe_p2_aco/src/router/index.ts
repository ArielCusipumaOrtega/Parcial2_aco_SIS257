import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/recintos',
    },
    {
      path: '/recintos',
      name: 'recintos',
      component: () => import('../views/RecintosView.vue'),
    },
    {
      path: '/eventos-culturales',
      name: 'eventos-culturales',
      component: () => import('../views/EventosView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/recintos',
    },
  ],
})

export default router
