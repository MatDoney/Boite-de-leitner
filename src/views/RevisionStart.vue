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
}
.start-button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>
