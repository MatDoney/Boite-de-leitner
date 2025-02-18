<template>
  <div class="settings-container">
    <h3>Configuration de la révision</h3>

    <label>Catégories :</label>
    <select v-model="selectedCategory" class="select-category">
      <option value="">Toutes les catégories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>

    <label>Thèmes à réviser :</label>
    <div class="dropdown">
      <button class="dropdown-button" @click="toggleDropdown">
        Sélectionner les thèmes
      </button>
      <div v-if="dropdownOpen" class="dropdown-content">
        <ul>
          <li v-for="theme in filteredThemes" :key="theme.id">
            <input type="checkbox" :value="theme.id" v-model="selectedThemes" class="checkbox" />
            <span class="checkbox-label">{{ theme.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <label>Nombre de nouvelles cartes par jour :</label>
    <input type="number" v-model="dailyNewCards" min="1" max="20" class="input-number" />
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
const dropdownOpen = ref(false)
const selectedCategory = ref<string>('')

// Définition des événements émis par le composant
const emit = defineEmits(['updateThemes', 'updateDailyNewCards'])

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

// Fonction pour basculer l'affichage de la liste déroulante
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Fonction pour mettre à jour les thèmes sélectionnés
const updateThemes = () => {
  emit('updateThemes', selectedThemesObjects.value)
}

// Fonction pour mettre à jour le nombre de nouvelles cartes quotidiennes
const updateDailyNewCards = () => {
  emit('updateDailyNewCards', dailyNewCards.value)
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.checkbox {
  margin-right: 10px;
  accent-color: #007bff; /* Couleur moderne pour les cases à cocher */
}

.checkbox-label {
  color: #333; /* Texte plus visible */
}

.input-number {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.select-category {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
