import { defineStore } from 'pinia'

export const useCardStore = defineStore('cartes', {
    state: () => ({
        cartes: [
            { id: 1, themeId: 1,niveau :1, question: 'Quelle est la capitale de la France ?', reponse: 'Paris' },
            { id: 2, themeId: 1,niveau :1, question: 'Quelle est la formule de l’eau ?', reponse: 'H2O' },
        ]
    }),
    actions: {
        // Ajout d'une carte
        addCard(question: string, reponse: string, themeId: number,niveau: number) {
            const newCard = { id: Date.now(), question, reponse, themeId,niveau }
            this.cartes.push(newCard)
            this.saveCards() // Sauvegarde après ajout
        },

        // Mise à jour d'une carte (modification de la question et de la réponse)
        updateCard(id: number, question: string, reponse: string) {
            const card = this.cartes.find(c => c.id === id)
            if (card) {
                card.question = question
                card.reponse = reponse
                card.niveau = 1
                this.saveCards()
            }
        },

        // Suppression d'une carte
        removeCard(id: number) {
            this.cartes = this.cartes.filter(c => c.id !== id)
            this.saveCards()
        },

        // Sauvegarde des cartes dans le localStorage
        saveCards() {
            localStorage.setItem('cartes', JSON.stringify(this.cartes))
        },

        // Chargement des cartes depuis le localStorage
        loadCards() {
            const storedCards = localStorage.getItem('cartes')
            if (storedCards) {
                this.cartes = JSON.parse(storedCards)
            }
        }
    }
})

// Charge les cartes depuis le stockage local lors de l'initialisation du store
const cardStore = useCardStore()
cardStore.loadCards()
