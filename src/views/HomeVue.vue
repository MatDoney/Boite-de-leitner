<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRevisionStore } from '@/stores/revisionStore';

const router = useRouter();
const revisionStore = useRevisionStore();

// Fonction pour gérer le clic sur un programme
const handleProgramClick = (programId: number) => {
  router.push(`/programme/${programId}`);
};

// Charger les programmes depuis le local storage au montage du composant
revisionStore.programs = JSON.parse(localStorage.getItem('revisionPrograms') || '[]');
</script>

<template>
  <h1>Programmes de révision</h1>
  <ul class="program-list">
    <li v-for="program in revisionStore.programs" :key="program.id" @click="handleProgramClick(program.id)" class="program-item">
      {{ program.name }}
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
  align-items: center;
  justify-content: space-between;
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
</style>