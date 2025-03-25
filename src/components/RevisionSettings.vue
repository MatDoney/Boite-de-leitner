<template>
  <div class="settings-container">
    <h3>Configuration de la révision</h3>

    <label>Nom du programme :</label>
    <input type="text" v-model="programName" class="input-text" @input="updateProgramName" />

    <label>Catégories :</label>
    <select v-model="selectedCategory" class="select-category">
      <option value="">Toutes les catégories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>

    <label>Thèmes à réviser :</label>
    <div class="carousel">
      <div class="carousel-inner">
        <div 
          v-for="theme in filteredThemes" 
          :key="theme.id" 
          class="carousel-item" 
          :class="{ 'selected': selectedThemes.includes(theme.id) }"
          @click="toggleThemeSelection(theme.id)"
        >
          {{ theme.name }}
        </div>
      </div>
    </div>

    <label>Nombre de nouvelles cartes par jour :</label>
    <input type="number" v-model="dailyNewCards" min="1" max="20" class="input-number" @input="updateDailyNewCards" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue'
import { useThemesStore } from '@/stores/themesStore'
import { useCategoriesStore } from '@/stores/categories'

// Utilisation des stores de thèmes et de catégories
const themesStore = useThemesStore()
const categoriesStore = useCategoriesStore()
const themes = themesStore.themes
const categories = categoriesStore.categories
const selectedThemes = ref<number[]>([])
const dailyNewCards = ref(5)
const selectedCategory = ref<string>('')
const programName = ref<string>('')

// Définition des événements émis par le composant
const emit = defineEmits(['updateThemes', 'updateDailyNewCards', 'updateProgramName'])

// Filtrage des thèmes en fonction de la catégorie sélectionnée
const filteredThemes = computed(() => {
  if (!selectedCategory.value) {
    return themes
  }
  return themes.filter(theme => theme.categoryId === Number(selectedCategory.value))
})

// Calcul des thèmes sélectionnés
const selectedThemesObjects = computed(() => {
  return themes.filter(theme => selectedThemes.value.includes(theme.id))
})

// Fonction pour basculer la sélection d'un thème
const toggleThemeSelection = (themeId: number) => {
  if (selectedThemes.value.includes(themeId)) {
    selectedThemes.value = selectedThemes.value.filter(id => id !== themeId)
  } else {
    selectedThemes.value.push(themeId)
  }
  updateThemes()
}

// Fonction pour mettre à jour les thèmes sélectionnés
const updateThemes = () => {
  emit('updateThemes', selectedThemesObjects.value)
}

// Fonction pour mettre à jour le nombre de nouvelles cartes quotidiennes
const updateDailyNewCards = () => {
  emit('updateDailyNewCards', dailyNewCards.value)
}

// Fonction pour mettre à jour le nom du programme
const updateProgramName = () => {
  emit('updateProgramName', programName.value)
}
</script>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.carousel {
  overflow: hidden;
  width: 100%;
}

.carousel-inner {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  flex: 0 0 auto;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  scroll-snap-align: start;
  transition: background-color 0.3s ease;
}

.carousel-item.selected {
  background-color: #007bff;
  color: white;
}

.input-number {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.select-category {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.input-text {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
