<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<template>
  <header>

      <nav>
        <RouterLink to="/">🏚️</RouterLink>
        <RouterLink to="/about">🙍‍♂️</RouterLink>
      </nav>
  </header>
</template>

<style scoped>
/* Règles communes */
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

/* Styles pour grand écran */
@media (min-width: 1024px) {
  nav {
    width: 10vh;
    height: 100vh;
    font-size: 1rem;
    text-align: left;
    background-color: darkblue;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    left: 0;
    top: 0;
    padding: 1rem 0;

  }

  nav a {
    display: flex;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    justify-content: space-evenly;
  }
}

/* Styles pour petit écran */
@media (max-width: 1024px) {
  nav {
    width: 100%;

    height: 5vh;
    font-size: 1rem;
    text-align: center;
    background-color: darkblue;
    display: flex;
    flex-direction: row;
    position: fixed;
    margin-left: 0;
    padding: 1rem 0;
    bottom: 0;
    justify-content: space-between;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
}

</style>