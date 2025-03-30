<template>
  <div class="theme-list-container">
    <div class="header">
      <h3>Liste des thèmes</h3>
      <button @click="$emit('toggleThemeForm')" class="btn-add-theme">Ajouter un thème</button>
    </div>
    <ul class="theme-list">
      <li v-for="theme in themes" :key="theme.id" class="theme-item">
        <router-link
           :to="{ name: 'cardList', params: { themeId: theme.id } }"
          class="view-themes-link"
        >
          <span class="theme-name">{{ theme.name }}</span>
        </router-link>
        <div class="button-container">
          <button @click="$emit('edit', theme)" class="btn-edit">Modifier</button>
          <button @click="$emit('delete', theme.id)" class="btn-delete">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Définir l'interface pour un thème
interface Theme {
  id: number;
  name: string;
}

// Définir les props acceptées par le composant
const props = defineProps<{
  themes: Theme[]
}>()
</script>

<style scoped>
.theme-list-container {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.5rem;
  color: #333;
}

.theme-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.theme-item {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.theme-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.theme-name {
  font-size: 1.1rem;
  color: #333;
  flex-grow: 1;
  padding-right: 20px;
}

.button-container {
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  padding: 8px 15px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

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

.view-themes-link {
  font-size: 0.9rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}
</style>
