<script setup lang="ts">
import { computed } from "vue";
import { useCardStore } from "@/stores/CardStore.ts";
import Card from "../components/Card.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const theme_id: number = Number(route.params.themeId);

// Store Pinia
const cartesStore = useCardStore();

// Filtrer les cartes par thème
const filteredCartes = computed(() =>
    cartesStore.cartes.filter(carte => carte.themeId === theme_id)
);
console.log(theme_id);
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
