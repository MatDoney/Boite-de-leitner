<template>
  <div class="revision-container">
    <h2>Démarrer une révision</h2>

    <RevisionSettings 
      @updateThemes="updateThemes"
      @updateDailyNewCards="updateDailyNewCards"
      @updateThemeLevel="updateThemeLevel"
    />

    <button @click="startRevision" class="start-button">Commencer</button>
  </div>
</template>

<script setup lang="ts">
import { useRevisionStore } from '@/stores/revisionStore'
import RevisionSettings from '../components/RevisionSettings.vue'

const revisionStore = useRevisionStore()

interface Theme {
  id: number
  name: string
  // Ajoutez d'autres propriétés selon vos besoins
}

const updateThemes = (themes: Theme[]) => revisionStore.selectThemes(themes)
const updateDailyNewCards = (value: number) => revisionStore.setDailyNewCards(value)
const updateThemeLevel = (themeId: number, level: number) => revisionStore.setThemeLevel(themeId, level)

const startRevision = () => {
  revisionStore.startRevision()
}
</script>

<style scoped>
.revision-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
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
