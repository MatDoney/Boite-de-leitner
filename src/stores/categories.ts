import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Histoire' }
    ]
  }),
  actions: {
    // Ajouter une nouvelle catégorie
    addCategory(name: string) {
      const newCategory = { id: Date.now(), name }
      this.categories.push(newCategory)
      this.saveCategories()
    },
    // Mettre à jour une catégorie existante
    updateCategory(id: number, name: string) {
      const category = this.categories.find(c => c.id === id)
      if (category) {
        category.name = name
        this.saveCategories()
      }
    },
    // Supprimer une catégorie
    removeCategory(id: number) {
      this.categories = this.categories.filter(c => c.id !== id)
      this.saveCategories()
    },
    // Sauvegarder les catégories dans le localStorage
    saveCategories() {
      localStorage.setItem('categories', JSON.stringify(this.categories))
    },
    // Charger les catégories depuis le localStorage
    loadCategories() {
      const categories = localStorage.getItem('categories')
      if (categories) {
        this.categories = JSON.parse(categories)
      }
    }
  }
})

// Chargez les catégories depuis le stockage local lors de l'initialisation du store
const categoriesStore = useCategoriesStore()
categoriesStore.loadCategories()
