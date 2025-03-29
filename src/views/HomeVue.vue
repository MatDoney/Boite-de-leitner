<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRevisionStore } from '@/stores/revisionStore';
import { useCardStore } from '@/stores/CardStore';

const router = useRouter();
const revisionStore = useRevisionStore(); // Appelé dans `setup`, donc après l'initialisation de Pinia
const cardStore = useCardStore(); // Idem

// Fonction pour gérer le clic sur un programme
const handleProgramClick = (programId: string) => { // Typage corrigé pour accepter une chaîne
  router.push(`/programme/${programId}`);
};

// Charger les programmes depuis le local storage au montage du composant
revisionStore.programs = JSON.parse(localStorage.getItem('revisionPrograms') || '[]');

// Calculer les statistiques des cartes par niveau pour un programme
const getStatsByLevel = (programId: string) => {
  const program = revisionStore.programs.find(p => p.id === programId);
  if (!program) return {};

  const stats: Record<number, number> = {};
  for (let level = 1; level <= 7; level++) {
    stats[level] = program.themes
      .map(theme => theme.id)
      .flatMap(themeId =>
        cardStore.cartes.filter(carte => carte.themeId === themeId && carte.niveau === level)
      ).length;
  }
  return stats;
};
</script>

<template>
  <h1>Programmes de révision</h1>
  <ul class="program-list">
    <li
      v-for="program in revisionStore.programs"
      :key="program.id"
      @click="handleProgramClick(program.id)" 
      class="program-item"
    >
      <div>
        <span class="program-name">{{ program.name }}</span>
        <ul class="stats-list">
          <li v-for="(count, level) in getStatsByLevel(program.id)" :key="level" class="stats-item">
            Niveau {{ level }} : {{ count }} cartes
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.program-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.program-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
}

.program-item:hover {
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.program-item:active {
  background-color: #e0e0e0;
}

.program-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.stats-list {
  display: flex; /* Utiliser flexbox pour aligner les statistiques sur la même ligne */
  flex-wrap: wrap; /* Permettre le retour à la ligne si nécessaire */
  gap: 10px; /* Espacement entre les éléments */
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.stats-item {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  color: #555;
  white-space: nowrap; /* Empêcher le retour à la ligne dans un élément */
}
</style>