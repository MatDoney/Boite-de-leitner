<template>
  <div class="form-container">
    <h3 class="form-title">{{ categoryId ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}</h3>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="category-name" class="form-label">Nom</label>
        <input
          type="text"
          id="category-name"
          v-model="categoryName"
          placeholder="Nom de la catégorie"
          required
          class="form-input"
        />
      </div>
      <button type="submit" class="form-button">{{ categoryId ? 'Modifier' : 'Ajouter' }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

// Utiliser le store des catégories
const categoriesStore = useCategoriesStore()

// Définir les props acceptées par le composant
const props = defineProps<{
  categoryId?: number // ID de catégorie passé en prop
}>()

// Référence pour le nom de la catégorie
const categoryName = ref('')

// Si un `categoryId` est passé, on charge les données de cette catégorie
onMounted(() => {
  if (props.categoryId) {
    const category = categoriesStore.categories.find(c => c.id === props.categoryId)
    if (category) {
      categoryName.value = category.name
    }
  }
})

// Fonction pour soumettre le formulaire
function submitForm() {
  if (categoryName.value.trim()) {
    if (props.categoryId) {
      categoriesStore.updateCategory(props.categoryId, categoryName.value.trim())
    } else {
      categoriesStore.addCategory(categoryName.value.trim())
    }
    categoryName.value = ''  // Réinitialiser après soumission
  }
}
</script>

<style scoped>
/* Conteneur compact avec un fond doux et des coins arrondis */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

/* Titre plus petit mais toujours visible et élégant */
.form-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

/* Formulaire avec des espacements réduits */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Conteneur du champ de formulaire avec un petit espace */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* Label compact et clair */
.form-label {
  font-size: 0.9rem;
  font-weight: 400;
  color: #555;
}

/* Champ de saisie avec une bordure plus discrète */
.form-input {
  padding: 0.7rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #4c6ef5;
  box-shadow: 0px 0px 4px rgba(76, 110, 245, 0.3);
}

/* Bouton avec un léger effet au survol */
.form-button {
  padding: 0.7rem;
  background-color: #4c6ef5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.form-button:hover {
  background-color: #3b5bbf;
  transform: translateY(-2px);
}

.form-button:active {
  background-color: #2a4797;
  transform: translateY(0);
}
</style>
