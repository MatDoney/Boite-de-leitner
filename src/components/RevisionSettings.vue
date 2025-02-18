<template>
    <div class="settings-container">
      <h3>Configuration de la révision</h3>
  
      <label>Thèmes à réviser :</label>
      <ul>
        <li v-for="theme in themes" :key="theme.id">
          <input type="checkbox" :value="theme.id" v-model="selectedThemes" />
          {{ theme.name }}
        </li>
      </ul>
  
      <label>Nombre de nouvelles cartes par jour :</label>
      <input type="number" v-model="dailyNewCards" min="1" max="20" />
  
      <label>Niveau de départ pour chaque thème :</label>
      <ul>
        <li v-for="theme in selectedThemesObjects" :key="theme.id">
          {{ theme.name }}
          <select v-model="themeLevels[theme.id]">
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
    gap: 10px;
  }
  </style>
  