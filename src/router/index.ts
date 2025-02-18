import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    {
      path: '/revision',
      name: 'revision',
      component: () => import('@/views/RevisionStart.vue'), // La même vue, mais on passe un id
      props: true,  // Permet de passer les paramètres de la route comme props
    },
    
  ],
})

export default router