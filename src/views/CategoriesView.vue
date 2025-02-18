<template>
  <div>
    <CategoriesList />
    <CategoriesForm :categoryId="categoryId" />
    <div v-if="categoryId !== undefined">
      <h3>Thèmes pour la catégorie : {{ currentCategory?.name }}</h3>
      <ul>
        <li v-for="theme in themes" :key="theme.id">{{ theme.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { useThemesStore } from '@/stores/themesStore'
import CategoriesList from '@/components/CategoriesList.vue'
import CategoriesForm from '@/components/CategoriesForm.vue'

// Récupérer la route actuelle
const route = useRoute()
// Utiliser les stores des catégories et des thèmes
const categoriesStore = useCategoriesStore()
const themesStore = useThemesStore()

// Récupérer l'ID de la catégorie depuis les paramètres de la route
const categoryId = ref(route.params.id ? Number(route.params.id) : undefined)

// Obtenir les thèmes pour la catégorie actuelle
const themes = computed(() => categoryId.value !== undefined ? themesStore.getThemesByCategoryId(categoryId.value) : [])
// Trouver la catégorie actuelle pour l'afficher
const currentCategory = computed(() => categoryId.value !== undefined ? categoriesStore.categories.find(c => c.id === categoryId.value) : null)
</script>
