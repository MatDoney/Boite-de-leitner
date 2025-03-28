<script setup lang="ts">
import { ref, computed } from "vue";
import { useCardStore } from "@/stores/CardStore.ts";

// Props
const props = defineProps<{ id: number }>();

// Store Pinia
const cartesStore = useCardStore();

// Récupération de la carte en fonction de l'ID
const carte = computed(() => cartesStore.cartes.find(c => c.id === props.id));

// État de la rotation de la carte
const isFlipped = ref(false);

// Fonction pour retourner la carte
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};

// Fonction pour augmenter le niveau de la carte
const increaseLevel = () => {
  if (carte.value) {
    cartesStore.updateCard(carte.value.id, carte.value.question, carte.value.reponse, carte.value.niveau + 1);
  } else {
    throw new Error("Aucune carte correspondante");
  }
};

// Fonction pour réinitialiser le niveau de la carte
const resetLevel = () => {
  if (carte.value) {
    cartesStore.updateCard(carte.value.id, carte.value.question, carte.value.reponse, 1);
  } else {
    throw new Error("Aucune carte correspondante");
  }
};
</script>

<template>
  <div
      class="card"
      :class="{ flipped: isFlipped }"
      @click="flipCard"
      role="button"
      aria-pressed="false"
      :aria-label="isFlipped ? `Retourner pour voir la question` : `Retourner pour voir la réponse`"
  >
    <div class="card-inner">
      <div class="card-front">
        <p>{{ carte?.question || 'Question non trouvée' }}</p>
      </div>
      <div class="card-back">
        <div><p>{{ carte?.reponse || 'Réponse non trouvée' }}</p></div>
        <div class="card-buttons">
          <button class="btn-validate" @click.stop="increaseLevel">Je le savais !</button>
          <button class="btn-fail" @click.stop="resetLevel">J'avais oublié :(</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 84vh;
  height: 50vh;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-color: #ffffff;
}

.card-back {
  background-color: #f8f9fa;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}
.card-buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.btn-validate,
.btn-fail {
  padding: 8px 15px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-validate {
  background-color: green;
  color: white;
}

.btn-validate:hover {
  background-color: darkgreen;
}

.btn-fail {
  background-color: #e74c3c;
  color: white;
}

.btn-fail:hover {
  background-color: #c0392b;
}

@media (max-width: 1024px) {
  .card {
    width: 50vh;
  }
}
</style>
