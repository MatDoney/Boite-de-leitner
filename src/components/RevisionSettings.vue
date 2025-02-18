<template>
  <div class="settings-container">
    <h3>Configuration de la révision</h3>

    <label>Thèmes à réviser :</label>
    <ul>
      <li v-for="theme in themes" :key="theme.id">
        <input type="checkbox" :value="theme.id" v-model="selectedThemes" class="checkbox" />
        <span class="checkbox-label">{{ theme.name }}</span>
      </li>
    </ul>

    <label>Nombre de nouvelles cartes par jour :</label>
    <input type="number" v-model="dailyNewCards" min="1" max="20" class="input-number" />

    <label>Niveau de départ pour chaque thème :</label>
    <ul>
      <li v-for="theme in selectedThemesObjects" :key="theme.id">
        {{ theme.name }}
        <select v-model="themeLevels[theme.id]" class="select-level">
          <option v-for="level in 5" :key="level" :value="level">{{ level }}</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue'
import { useThemesStore } from '@/stores/themesStore'

const themesStore = useThemesStore()
const themes = themesStore.themes
const selectedThemes = ref<number[]>([])
const dailyNewCards = ref(5)
const themeLevels = ref<Record<number, number>>({})

const emit = defineEmits(['updateThemes', 'updateDailyNewCards', 'updateThemeLevel'])

const selectedThemesObjects = computed(() => {
  return themes.filter(theme => selectedThemes.value.includes(theme.id))
})

const updateThemes = () => {
  emit('updateThemes', selectedThemesObjects.value)
}

const updateDailyNewCards = () => {
  emit('updateDailyNewCards', dailyNewCards.value)
}

const updateThemeLevel = () => {
  emit('updateThemeLevel', themeLevels.value)
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

.select-level {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.start-button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #0056b3;
}
</style>
