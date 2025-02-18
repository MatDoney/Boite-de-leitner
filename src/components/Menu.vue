<script setup lang="ts">

import HelloWorld from "@/components/HelloWorld.vue";
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
@media (min-width: 1024px) {

nav {
  width: 100%;
  height: 100vh;
  font-size: 12px;
  text-align: center;
  background-color: darkblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  justify-content: space-evenly;
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

  nav {
    position: relative;
    text-align: left;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
    width: 10vh;
  }
}

@media (max-width: 768px) {
  nav {
    width: 100%;
    max-width: 768px;
    height: 5vh;
    font-size: 12px;
    text-align: center;

    background-color: darkblue;
    display: flex;
    flex-direction: row;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
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

  nav {
    position: fixed;
    text-align: center;
    margin-left: 0;
    font-size: 1rem;
    padding: 1rem 0;
    bottom: 0vh;
    justify-content: space-between;
  }
}
</style>