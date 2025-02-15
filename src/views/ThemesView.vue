<template>
  <div>

 
    <!-- Liste des thèmes -->
    <ThemeList
      :themes="themes"
      @edit="editTheme"
      @delete="removeTheme"
    />
       <!-- Formulaire d'ajout de thème -->
       <ThemeForm
      :categoryId="categoryId"
      :editMode="editMode"
      :theme="selectedTheme"
      @themeUpdated="fetchThemes"
    />

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemesStore } from '@/stores/themesStore'
import { useRoute } from 'vue-router'
import ThemeList from '@/components/ThemeList.vue'
import ThemeForm from '@/components/ThemeForm.vue'


const route = useRoute()
const themesStore = useThemesStore()

const categoryId = Number(route.params.categoryId)
const themes = computed(() => themesStore.getThemesByCategoryId(categoryId))

const selectedTheme = ref(null)
const editMode = ref(false)

// Fonction pour éditer un thème
const editTheme = (theme: { id: number, name: string }) => {
  selectedTheme.value = theme
  editMode.value = true
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
