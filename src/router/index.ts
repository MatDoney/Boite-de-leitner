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
    // Ajout de la route pour l'édition d'une catégorie
    {
      path: '/categories/edit/:id',
      name: 'editCategory',
      component: () => import('@/views/CategoriesView.vue'), // La même vue, mais on passe un id
      props: true,  // Permet de passer les paramètres de la route comme props
    },
    //ajout de la route edition d'une carte 
    {

      path: '/cardCreation',
      name: 'cardCreation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CardCreationVue.vue'),
    },
    //ajout de la route pour la révision
    {
      path: '/revision',
      name: 'revision',
      component: () => import('@/views/RevisionStart.vue'), // La même vue, mais on passe un id
      props: true,  // Permet de passer les paramètres de la route comme props
    },
    

  ],
})

export default router