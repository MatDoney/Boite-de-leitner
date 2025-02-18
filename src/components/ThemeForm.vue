<template>
  <div class="form-container">
    <h3>{{ editMode ? 'Modifier le thème' : 'Ajouter un thème' }}</h3>
    <form @submit.prevent="submitForm" class="theme-form">
      <input
        v-model="themeName"
        type="text"
        placeholder="Nom du thème"
        class="theme-input"
        required
      />
      <button type="submit" class="submit-button">
        {{ editMode ? 'Modifier' : 'Ajouter' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useThemesStore } from '@/stores/themesStore'

// Définir l'interface pour un thème
interface Theme {
  id: number;
  name: string;
}

// Définir les props acceptées par le composant
const props = defineProps<{
  categoryId: number;
  editMode: boolean;
  theme: Theme | null;
}>()

// Définir les événements émis par le composant
const emit = defineEmits()

// Référence pour le nom du thème
const themeName = ref('')

// Si on est en mode édition, on pré-remplie le champ avec le nom du thème
watchEffect(() => {
  if (props.editMode && props.theme) {
    themeName.value = props.theme.name
  } else {
    themeName.value = ''
  }
})

// Fonction pour soumettre le formulaire
const submitForm = () => {
  const themesStore = useThemesStore()
  if (props.editMode && props.theme) {
    // Appeler l'action pour modifier le thème
    themesStore.updateTheme(props.theme.id, props.categoryId, themeName.value)
  } else {
    // Appeler l'action pour ajouter un nouveau thème
    themesStore.addThemeToCategory(props.categoryId, themeName.value)
  }

  // Émettre un événement pour indiquer que le formulaire a été soumis
  emit('themeUpdated')
  themeName.value = ''
  emit('cancelEdit') // Réinitialiser le mode édition
}
</script>

<style scoped>
.form-container {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

h3 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.theme-form {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.theme-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.theme-input:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  padding: 8px 15px;
  font-size: 1rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
