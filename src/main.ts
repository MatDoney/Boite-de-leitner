import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useCardStore } from './stores/CardStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Assurez-vous que Pinia est utilisé ici
app.use(router);

// Chargez les cartes après l'initialisation de Pinia
const cardStore = useCardStore();
cardStore.loadCards();

app.mount('#app');
