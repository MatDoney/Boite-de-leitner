import { defineStore } from 'pinia';

interface StoredCard {
  id: string;
  themeId: number;
  niveau: number;
  question: string;
  reponse: string;
}

interface Card {
  id: number;
  themeId: number;
  niveau: number;
  question: string;
  reponse: string;
}

export const useCardStore = defineStore('cartes', {

  state: () => ({
    cartes: [
      { id: 1, themeId: 4, niveau: 1, question: 'Quelle est la capitale de la France ?', reponse: 'Paris' },
      { id: 2, themeId: 1, niveau: 1, question: 'Quelle est la formule de l’eau ?', reponse: 'H2O' },
    ],
  }),
  actions: {
    // Ajout d'une carte
    addCard(question: string, reponse: string, themeId: number, niveau: number) {
      const newCard = { id: Date.now(), question, reponse, themeId, niveau: 1 };
      this.cartes.push(newCard);
      this.saveCards(); // Sauvegarde après ajout
    },

    // Mise à jour d'une carte (modification de la question et de la réponse)
    updateCard(id: number, question: string, reponse: string, niveau: number) {
      const card = this.cartes.find(c => c.id === id);
      if (card && niveau <= 7) {
        card.question = question;
        card.reponse = reponse;
        card.niveau = niveau;
        this.saveCards();
      } else if (card && niveau > 7) {
        this.removeCard(card.id);
      }
    },

    // Suppression d'une carte
    removeCard(id: number) {
      this.cartes = this.cartes.filter(c => c.id !== id);
      this.saveCards();
    },

    // Sauvegarde des cartes dans le localStorage
    saveCards() {
      const cardsToSave = this.cartes.map(card => ({
        ...card,
        id: String(card.id), // Assurez-vous que l'ID est une chaîne
      }));
      localStorage.setItem('cartes', JSON.stringify(cardsToSave));
    },

    // Chargement des cartes depuis le localStorage
    loadCards() {
      const storedCards = localStorage.getItem('cartes');
      if (storedCards) {
        this.cartes = JSON.parse(storedCards).map((card: StoredCard): Card => ({
          ...card,
          id: Number(card.id), // Convertir l'ID en nombre
        }));
      }
    },
  },
});

// Supprimez cet appel direct en dehors d'un composant ou d'une fonction Vue
// const cardStore = useCardStore();
// cardStore.loadCards();

