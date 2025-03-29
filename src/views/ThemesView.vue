<template>
  <div>
    <div class="flex items-center justify-between">
      <ThemeList
        :themes="themes"
        @edit="editTheme"
        @delete="removeTheme"
        @toggleThemeForm="toggleThemeForm"
      />
    </div>
    <ThemeForm v-if="showThemeForm" :categoryId="categoryId" :editMode="editMode" :theme="selectedTheme" @themeUpdated="handleThemeUpdated" @cancelEdit="cancelEdit" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemesStore } from '@/stores/themesStore'
import { useRoute } from 'vue-router'
import ThemeList from '@/components/ThemeList.vue'
import ThemeForm from '@/components/ThemeForm.vue'

// Définir l'interface pour un thème
interface Theme {
  id: number;
  name: string;
}

// Récupérer la route actuelle
const route = useRoute()
// Utiliser le store des thèmes
const themesStore = useThemesStore()

// Récupérer l'ID de la catégorie depuis les paramètres de la route
const categoryId = Number(route.params.categoryId)
// Obtenir les thèmes pour la catégorie actuelle
const themes = computed(() => themesStore.getThemesByCategoryId(categoryId))

// Références pour le thème sélectionné et le mode édition
const selectedTheme = ref<Theme | null>(null)
const editMode = ref(false)
const showThemeForm = ref(false)

// Fonction pour basculer l'affichage du formulaire de thème
const toggleThemeForm = () => {
  showThemeForm.value = !showThemeForm.value
}

// Fonction pour éditer un thème
const editTheme = (theme: Theme) => {
  selectedTheme.value = { ...theme }  // Utiliser une copie de l'objet thème
  editMode.value = true
  showThemeForm.value = true
}

// Fonction pour annuler l'édition
const cancelEdit = () => {
  selectedTheme.value = null
  editMode.value = false
  showThemeForm.value = false
}

// Fonction pour gérer la mise à jour du thème
const handleThemeUpdated = () => {
  fetchThemes()
  cancelEdit()
}

// Fonction pour supprimer un thème
const removeTheme = (id: number) => {
  themesStore.removeThemeFromCategory(id)
}

// Recharger la liste des thèmes après modification ou ajout
const fetchThemes = () => {
  // Ce code peut être utilisé pour recharger les thèmes, ou mettre à jour localement la liste.
  themesStore.themes
}
</script>

<style scoped>
.btn-add-theme {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-theme:hover {
  background-color: #0056b3;
}
</style>
