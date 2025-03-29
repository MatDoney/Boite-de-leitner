<script setup lang="ts">
import { ref, computed } from "vue";
import { useCardStore } from "@/stores/CardStore.ts";
import { useRevisionStore } from "@/stores/revisionStore";
import { useThemesStore } from "@/stores/themesStore";
import Card from "../components/Card.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Convertir `program_id` en chaîne pour correspondre aux UUIDs
const program_id: string | null = route.params.programId ? String(route.params.programId) : null;
const theme_id: number | null = route.params.themeId ? Number(route.params.themeId) : null;

// Store Pinia
const cartesStore = useCardStore();
const revisionStore = useRevisionStore();
const themesStore = useThemesStore();

// Récupérer le nom du thème actuel à l'aide de getThemeById
const currentThemeName = computed(() => {
    const theme = theme_id !== null ? themesStore.getThemeById(theme_id) : null;
    return theme ? theme.name : "";
});

// État pour le niveau actuel
const currentLevel = ref(1);

// Récupérer les cartes en fonction du programme ou du thème
const filteredCartes = computed(() => {
    if (theme_id) {
        // Si un thème spécifique est consulté
        return cartesStore.cartes.filter(
            carte => carte.themeId === theme_id && carte.niveau === currentLevel.value
        );
    }

    if (program_id) {
        // Si un programme est consulté, récupérer les thèmes associés au programme
        const program = revisionStore.programs.find(p => p.id === program_id); // Comparer directement en tant que chaîne
        if (program) {
            return program.themes
                .map(theme => theme.id)
                .flatMap(themeId =>
                    cartesStore.cartes.filter(
                        carte => carte.themeId === themeId && carte.niveau === currentLevel.value
                    )
                );
        }
    }

    return []; // Aucun programme ou thème spécifique
});

// Fonction pour changer de niveau
const changeLevel = (direction: "next" | "prev") => {
    if (direction === "next") {
        currentLevel.value = Math.min(currentLevel.value + 1, 7); // Niveau maximum = 7
    } else if (direction === "prev") {
        currentLevel.value = Math.max(currentLevel.value - 1, 1); // Niveau minimum = 1
    }
};

// Fonction pour retourner à la liste des thèmes
const goBackToThemes = () => {
    router.push(`/categories`);
};
</script>

<template>
  <div class="carousel-container">
    <!-- Affichage du nom du thème et bouton retour -->
    <div class="header">
      <button class="back-button" @click="goBackToThemes">Retour</button>
      <h1 class="theme-title">{{ currentThemeName }}</h1>
      
    </div>

    <div class="carousel">
      <template v-if="filteredCartes.length > 0">
        <Card v-for="carte in filteredCartes" :key="carte.id" :id="String(carte.id)" class="carousel-item" />
      </template>
      <template v-else>
        <div class="no-cards-card">
          <p class="no-cards-message">Aucune Carte dans ce niveau</p>
        </div>
      </template>
    </div>
    <div class="level-navigation">
      <button @click="changeLevel('prev')" :disabled="currentLevel === 1" class="nav-button">←</button>
      <span class="current-level">Niveau {{ currentLevel }}</span>
      <button @click="changeLevel('next')" :disabled="currentLevel === 7" class="nav-button">→</button>
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
  flex-direction: column;
  justify-content: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  right: 0;
}

.theme-title {
  font-size: 24px;
  font-weight: bold;
}

.back-button {
  padding: 8px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}

.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 10px;
  width: 80%; /* Ajustement pour s'adapter à la largeur de l'écran */
  
  align-items: center;
  box-sizing: border-box;
}

.carousel-item {
  flex: 0 0 auto;
  scroll-snap-align: center;
}

.no-cards-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.no-cards-message {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  text-align: center;
}

.level-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.nav-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.nav-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.nav-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.current-level {
  font-size: 18px;
  font-weight: bold;
}

/* Styles responsives pour les petits écrans */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .theme-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .back-button {
    font-size: 14px;
    padding: 6px 12px;
  }

  .carousel {
    flex-direction: column; /* Affiche les cartes en colonne */
    overflow-y: auto; /* Active le défilement vertical */
    overflow-x: hidden; /* Désactive le défilement horizontal */
    gap: 10px;
    width: 100%;
    padding: 5px;
    height: 65vh; /* Ajuste la hauteur pour éviter le chevauchement avec le header */
  }

  .carousel-item {
    flex: 0 0 auto;
    width: 90%; /* Réduction de la largeur pour s'adapter à l'écran */
    margin: 0 auto; /* Centre les cartes horizontalement */
  }

  .no-cards-card {
    width: 90%; /* Réduction de la largeur pour s'adapter à l'écran */
    height: 150px;
  }

  .no-cards-message {
    font-size: 16px;
  }

  .nav-button {
    font-size: 14px;
    padding: 8px 15px;
  }

  .current-level {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .theme-title {
    font-size: 18px;
  }

  .back-button {
    font-size: 12px;
    padding: 5px 10px;
  }

  .carousel {
    gap: 5px;
    justify-content: center;
  }

  .carousel-item {
    width: 95%; /* Réduction supplémentaire pour les très petits écrans */
  }

  .no-cards-card {
    height: 120px;
  }

  .no-cards-message {
    font-size: 14px;
  }

  .nav-button {
    font-size: 12px;
    padding: 6px 10px;
  }

  .current-level {
    font-size: 14px;
  }
}
</style>
