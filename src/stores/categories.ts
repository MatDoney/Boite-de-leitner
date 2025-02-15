import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Histoire' }
    ]
  }),
  actions: {
    addCategory(name: string) {
      const newCategory = { id: Date.now(), name }
      this.categories.push(newCategory)
    },
    updateCategory(id: number, name: string) {
      const category = this.categories.find(c => c.id === id)
      if (category) {
        category.name = name
      }
    },
    removeCategory(id: number) {
      this.categories = this.categories.filter(c => c.id !== id)
    }
  }
})
