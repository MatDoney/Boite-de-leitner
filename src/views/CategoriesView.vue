<template>
  <div>
    <CategoriesList />
    <CategoriesForm :categoryId="categoryId" />
    <div v-if="categoryId">
      <h3>Thèmes pour la catégorie : {{ currentCategory?.name }}</h3>
      <ul>
        <li v-for="theme in themes" :key="theme.id">{{ theme.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { useThemesStore } from '@/stores/themesStore'
import CategoriesList from '@/components/CategoriesList.vue'
import CategoriesForm from '@/components/CategoriesForm.vue'

const route = useRoute()
const categoryId = route.params.id ? Number(route.params.id) : null  // Récupérer l'ID de la catégorie depuis les paramètres de la route

const categoriesStore = useCategoriesStore()
const themesStore = useThemesStore()

// Récupérer les thèmes pour la catégorie actuelle
const themes = categoryId ? themesStore.getThemesByCategoryId(categoryId) : []

// Trouver la catégorie actuelle pour l'afficher
const currentCategory = categoriesStore.categories.find(c => c.id === categoryId)
</script>
