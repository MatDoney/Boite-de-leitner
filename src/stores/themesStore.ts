import { defineStore } from 'pinia'
import { useCardStore } from './CardStore' // Adjust the path as needed

export const useThemesStore = defineStore('themes', {
  state: () => ({
    themes: [
      { id: 1, categoryId: 1, name: 'Physique' },
      { id: 2, categoryId: 1, name: 'Chimie' },
      { id: 3, categoryId: 2, name: 'Antiquité' },
      { id: 4, categoryId: 2, name: 'Moyen Âge' }
    ]
  }),
  getters: {
    // Getter pour obtenir les thèmes par ID de catégorie
    getThemesByCategoryId: (state) => {
      return (categoryId: number) => state.themes.filter(theme => theme.categoryId === categoryId)
    },
    // Getter pour obtenir un thème par ID
    getThemeById: (state) => {
      return (themeId: number) => state.themes.find(theme => theme.id === themeId)
    }
  },
  actions: {
    // Ajouter un thème à une catégorie
    addThemeToCategory(categoryId: number, themeName: string) {
      const newTheme = { id: Date.now(), categoryId, name: themeName }
      this.themes.push(newTheme)
      this.$patch({ themes: [...this.themes] }) 
      this.saveThemes()
    },
    // Mettre à jour un thème existant
    updateTheme(themeId: number, categoryId: number, themeName: string) {
      const theme = this.themes.find(t => t.id === themeId && t.categoryId === categoryId)
      if (theme) {
        theme.name = themeName
        this.$patch({ themes: [...this.themes] }) 
        this.saveThemes()
      }
    },
    // Supprimer un thème d'une catégorie
    removeThemeFromCategory(themeId: number) {
      this.themes = this.themes.filter(t => t.id !== themeId)
      this.$patch({ themes: [...this.themes] }) // Force la réactivité
      this.saveThemes()
    },
    // Sauvegarder les thèmes dans le localStorage
    saveThemes() {
      localStorage.setItem('themes', JSON.stringify(this.themes))
    },
    // Charger les thèmes depuis le localStorage
    loadThemes() {
      const themes = localStorage.getItem('themes')
      if (themes) {
        this.themes = JSON.parse(themes)
        console.log("Thèmes chargés :", this.themes);
      }
    },
    getCardsByThemeId(themeId: number) {
      const cardStore = useCardStore(); // Importez le store des cartes
      return cardStore.cartes.filter(card => card.themeId === themeId);
    }
  }
})

// Chargez les thèmes depuis le stockage local lors de l'initialisation du store
const themesStore = useThemesStore()
themesStore.loadThemes()
