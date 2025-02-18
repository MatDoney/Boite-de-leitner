import { defineStore } from 'pinia'

export const useRevisionStore = defineStore('revision', {
  state: () => ({
    selectedThemes: [] as { id: number; name: string }[], // Liste des thèmes sélectionnés pour la révision
    dailyNewCards: 5, // Nombre de nouvelles cartes par jour par défaut
    themeLevels: {} as Record<number, number>, // Stocke le niveau choisi pour chaque thème
  }),

  getters: {
    getThemeLevel: (state) => (themeId: number) => state.themeLevels[themeId] || 1,
  },

  actions: {
    selectThemes(themes: { id: number; name: string }[]) {
      this.selectedThemes = themes
    },

    setDailyNewCards(value: number) {
      this.dailyNewCards = value
    },

    setThemeLevel(themeId: number, level: number) {
      this.themeLevels[themeId] = level
    },

    startRevision() {
      console.log('Début de la révision avec les paramètres suivants :', this.selectedThemes, this.dailyNewCards, this.themeLevels)
    },
  },
})
