<template>
  <div class="settings-container">
    <h3>Configuration de la révision</h3>

    <label>Nom du programme :</label>
    <input type="text" v-model="programName" class="input-text" @input="updateProgramName" />

    <label>Catégories :</label>
    <select v-model="selectedCategory" class="select-category">
      <option value="">Toutes les catégories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>

    <label>Thèmes à réviser :</label>
    <div class="carousel">
      <div class="carousel-inner">

        <div 
          v-for="theme in limitedThemes" 
          :key="theme.id" 
          class="carousel-item" 
          :class="{ 'selected': selectedThemes.includes(theme.id) }"
          @click="toggleThemeSelection(theme.id)"
        >
          {{ theme.name }} ({{ theme.cards.length }} cartes)

        </div>
      </div>
    </div>

    
    <label>
      <input type="checkbox" v-model="enableNotifications" @change="handleNotificationChange" />
      Activer les notifications
    </label>

    <label>Heure de la notification :</label>
    <input type="time" v-model="notificationTime" class="input-time"  />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue'
import { useThemesStore } from '@/stores/themesStore'
import { useCategoriesStore } from '@/stores/categories'
import { useRevisionStore } from '@/stores/revisionStore'

// Utilisation des stores
const themesStore = useThemesStore()
const categoriesStore = useCategoriesStore()
const revisionStore = useRevisionStore()

// Variables et références
const themes = themesStore.themes
const categories = categoriesStore.categories
const selectedThemes = ref<number[]>([])
const dailyNewCards = ref(5)
const selectedCategory = ref<string>('')
const programName = ref<string>('')
const enableNotifications = ref<boolean>(false) // État de la checkbox
const notificationTime = ref<string>(revisionStore.notificationTime) // Heure de la notification

// Définition des événements émis par le composant
const emit = defineEmits(['updateThemes', 'updateDailyNewCards', 'updateProgramName', 'updateNotificationTime'])

// Propriété calculée pour obtenir les objets des thèmes sélectionnés
const selectedThemesObjects = computed(() => {
  return themes.filter(theme => selectedThemes.value.includes(theme.id))
})

// Filtrage des thèmes en fonction de la catégorie sélectionnée
const filteredThemes = computed(() => {
  if (!selectedCategory.value) {
    console.log("Thèmes filtrés (toutes catégories) :", themes);
    return themes;
  }
  const filtered = themes.filter(theme => theme.categoryId === Number(selectedCategory.value));
  console.log("Thèmes filtrés (catégorie sélectionnée) :", filtered);
  return filtered;
})

// Gestion des notifications
const handleNotificationChange = async () => {
  if (enableNotifications.value) {
    if (Notification.permission === 'granted') {
      console.log('Notifications déjà autorisées');
      revisionStore.setNotification(true)
      revisionStore.scheduleDailyNotification(notificationTime.value) // Planifier la notification
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        revisionStore.setNotification(true)
        revisionStore.scheduleDailyNotification(notificationTime.value) // Planifier la notification
      } else {
        enableNotifications.value = false
        alert('Vous devez autoriser les notifications pour activer cette option.')
      }
    } else {
      enableNotifications.value = false
      alert('Les notifications sont bloquées dans votre navigateur.')
    }
  } else {
    revisionStore.setNotification(false)
  }
}

// Fonction pour basculer la sélection d'un thème
const toggleThemeSelection = (themeId: number) => {
  if (selectedThemes.value.includes(themeId)) {
    selectedThemes.value = selectedThemes.value.filter(id => id !== themeId)
  } else {
    selectedThemes.value.push(themeId)
  }
  updateThemes()
}

// Fonction pour mettre à jour les thèmes sélectionnés
const updateThemes = () => {
  emit('updateThemes', selectedThemesObjects.value)
}

// Fonction pour limiter les cartes affichées par jour
const limitedThemes = computed(() => {
  return filteredThemes.value.map(theme => {
    const cards = themesStore.getCardsByThemeId(theme.id); // Assurez-vous que cette méthode existe dans le store
    return { ...theme, cards: cards.slice(0, dailyNewCards.value) }; // Limiter les cartes
  });
})

// Fonction pour mettre à jour le nombre de nouvelles cartes quotidiennes
const updateDailyNewCards = () => {
  emit('updateDailyNewCards', dailyNewCards.value)
}

// Fonction pour mettre à jour le nom du programme
const updateProgramName = () => {
  emit('updateProgramName', programName.value)
}


</script>

<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.carousel {
  overflow: hidden;
  width: 100%;
}

.carousel-inner {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  flex: 0 0 auto;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  scroll-snap-align: start;
  transition: background-color 0.3s ease;
}

.carousel-item.selected {
  background-color: #007bff;
  color: white;
}

.input-number {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.select-category {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.input-text {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.input-time {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
