<script setup lang="ts">
import { ref } from 'vue';
import { useThemesStore } from "@/stores/themesStore.ts";
import { useCardStore } from "@/stores/CardStore.ts";

// Définition des props (id est optionnel pour le update)
const props = defineProps<{
  id?: number;
  question: string;
  reponse: string;
  editCard: boolean;
}>();

// Récupérer les stores
const themesStore = useThemesStore();
const cardStore = useCardStore();

// Champs du formulaire
const questionField = ref(props.question);
const reponseField = ref(props.reponse);
const selectedTheme = ref<number | null>(null); // pour addCard, on a besoin d'un themeId

// Gestion de la soumission du formulaire
function handleSubmit(e: Event) {
  e.preventDefault();

  // Si on a un id, on met à jour la carte
  if (props.id !== undefined) {
    cardStore.updateCard(props.id, questionField.value, reponseField.value,1);
  } else {
    // Pour l'ajout, on vérifie qu'un thème est sélectionné
    if (selectedTheme.value === null) {
      alert("Veuillez choisir un thème");
      return;
    }



    cardStore.addCard(questionField.value, reponseField.value, selectedTheme.value,1);
    //window.location.replace("/theme/"+ selectedTheme.value);
    window.location.replace("/categories");
  }
}
</script>

<template>
  <div class="classCreation">
    <form class="card-form" @submit="handleSubmit">
      <h2>{{ editCard ? 'Modification ' : 'Création' }} de carte</h2>
      <div class="form-group">
        <label for="theme">Thème :</label>
        <select name="theme" id="theme" v-model="selectedTheme" required>
          <option value="" disabled>Choisissez un thème</option>
          <option
              v-for="(theme, index) in themesStore.themes"
              :key="index"
              :value="theme.id">
            {{ theme.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="question">Question :</label>
        <input
            id="question"
            type="text"
            placeholder="Entrez la question"
            v-model="questionField" required/>
      </div>
      <div class="form-group">
        <label for="reponse">Réponse :</label>
        <textarea
            id="reponse"
            placeholder="Entrez la réponse"
            v-model="reponseField" required>
        </textarea>
      </div>
      
      <div class="form-group">
        <input type="submit" value="Valider" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.classCreation {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: center; /* Centre verticalement */
  height: 100vh; /* Ajuste la hauteur au viewport */
}
/* Conteneur principal du formulaire */
.card-form {
  /*max-width: 400px;*/
  margin: 2rem auto;
  width: 50%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Titre du formulaire */
.card-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Groupe de champ */
.card-form .form-group {
  margin-bottom: 1rem;
}

/* Labels */
.card-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Champs de saisie */
.card-form input[type="text"],
.card-form textarea,
.card-form select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

/* Focus sur les champs */
.card-form input[type="text"]:focus,
.card-form textarea:focus {
  border-color: #007BFF;
  outline: none;
}

/* Textarea redimensionnable */
.card-form textarea {
  resize: vertical;
  min-height: 100px;
}

/* Bouton de soumission */
.card-form input[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover sur le bouton */
.card-form input[type="submit"]:hover {
  background-color: #0056b3;
}

@media (max-width: 1024px) {
  .card-form {
    width: 100%;
  }
}
</style>
