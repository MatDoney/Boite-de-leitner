<template>
  <div>
    <div class="flex items-center justify-between">
      <CategoriesList @toggleCategoryForm="toggleCategoryForm" />
    </div>
    <CategoriesForm v-if="showCategoryForm" :categoryId="categoryId" />
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

// État pour afficher ou masquer le formulaire de catégorie
const showCategoryForm = ref(false)

// Fonction pour basculer l'affichage du formulaire de catégorie
const toggleCategoryForm = () => {
  showCategoryForm.value = !showCategoryForm.value
}
</script>

<style scoped>
.btn-add-category {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-category:hover {
  background-color: #0056b3;
}
</style>
