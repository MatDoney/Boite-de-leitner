<script setup lang="ts">
import { computed } from "vue";
import { useCardStore } from "@/stores/CardStore.ts";
import { useRevisionStore } from "@/stores/revisionStore";
import Card from "../components/Card.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const program_id: number = Number(route.params.programId);
const theme_id: number = Number(route.params.themeId);

// Store Pinia
const cartesStore = useCardStore();
const revisionStore = useRevisionStore();

// Charger les thèmes associés au programme sélectionné
const selectedProgram = computed(() => revisionStore.programs.find(program => program.id === program_id));
const themesIds = computed(() => selectedProgram.value ? selectedProgram.value.themes.map(theme => theme.id) : []);

// Filtrer les cartes par les thèmes associés au programme ou par `themeId` si fourni
const filteredCartes = computed(() => {
    if (theme_id) {
        return cartesStore.cartes.filter(carte => carte.themeId === theme_id);
    }
    return cartesStore.cartes.filter(carte => themesIds.value.includes(carte.themeId));
});
console.log(program_id, theme_id);

// Fonction pour obtenir la carte suivante selon la logique de la boîte de Leitner
const getNextCard = () => {
  // Logique simplifiée pour obtenir la carte suivante
  return filteredCartes.value[0]; // Remplacer par la logique réelle
};
</script>

<template>
  <div class="carousel-container">
    <div class="carousel">
      <Card v-for="carte in filteredCartes" :key="carte.id" :id="carte.id" class="carousel-item" />
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  height: 100vh;
  align-items: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.carousel {

  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 10px;
  width: 100vh;
}

.carousel-item {
  flex: 0 0 auto;
  scroll-snap-align: center;
}
</style>
