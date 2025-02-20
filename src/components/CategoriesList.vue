<template>
  <div class="categories-container">
    <div class="header">
      <h2 class="title">Liste des catégories</h2>
      <button @click="$emit('toggleCategoryForm')" class="btn-add-category">Ajouter une catégorie</button>
    </div>
    <ul class="categories-list">
      <li v-for="category in categories" :key="category.id" class="category-item">
        <router-link
          :to="{ name: 'themes', params: { categoryId: category.id } }"
          class="view-themes-link"
        >
        <span class="category-name">{{ category.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'

const categoriesStore = useCategoriesStore()

const categories = categoriesStore.categories
</script>

<style scoped>
.categories-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  color: #333;
}

.categories-list {
  list-style: none;
  padding: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.category-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-name {
  font-weight: bold;
  color: #2c3e50;
}

.view-themes-link {
  font-size: 0.9rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.view-themes-link:hover {
  text-decoration: underline;
}

.btn-add-category {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-category:hover {
  background-color: #0056b3;
}
</style>
