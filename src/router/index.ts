import { createRouter, createWebHistory } from 'vue-router'

import HomeVue from "@/views/HomeVue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeVue.vue"),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue'),
    },
    {
      path: '/theme/:categoryId',
      name: 'themes',
      component: () => import('@/views/ThemesView.vue'),
    },
    {
      path: '/categories/edit/:id',
      name: 'editCategory',
      component: () => import('@/views/CategoriesView.vue'),
      props: true,
    },
    {
      path: '/cardCreation',
      name: 'cardCreation',
      component: () => import('../views/CardCreationVue.vue'),
    },
    {
      path: '/revision',
      name: 'revision',
      component: () => import('@/views/RevisionStart.vue'),
      props: true,
    },
    {
      path: '/cardList/:themeId',
      name: 'cardList',
      component: () => import('../views/CardsList.vue'),
      props: true,
    },
    {
      path: '/programme/:programId',
      name: 'CardsList',
      component: () => import('../views/CardsList.vue'),
      props: true
    },
  ],
})

export default router