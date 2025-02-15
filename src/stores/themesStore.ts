import { defineStore } from 'pinia'

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
    getThemesByCategoryId: (state) => {
      return (categoryId: number) => state.themes.filter(theme => theme.categoryId === categoryId)
    }
  },
  actions: {
    addThemeToCategory(categoryId: number, themeName: string) {
      const newTheme = { id: Date.now(), categoryId, name: themeName }
      this.themes.push(newTheme)
      this.$patch({ themes: [...this.themes] }) // Force la réactivité
    },
    updateTheme(categoryId: number, themeId: number, themeName: string) {
      const theme = this.themes.find(t => t.id === themeId && t.categoryId === categoryId)
      if (theme) {
        theme.name = themeName
        this.$patch({ themes: [...this.themes] }) // Force la réactivité
      }
    },
    removeThemeFromCategory(themeId: number) {
      this.themes = this.themes.filter(t => t.id !== themeId)
      this.$patch({ themes: [...this.themes] }) // Force la réactivité
    }
  }
})
