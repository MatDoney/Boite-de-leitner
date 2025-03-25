import { defineStore } from 'pinia'

// Fonction pour générer un ID unique
function generateUniqueId() {
  return Date.now();
}

export const useRevisionStore = defineStore('revision', {
  state: () => ({
    selectedThemes: [] as { id: number; name: string }[], // Liste des thèmes sélectionnés pour la révision
    dailyNewCards: 5, // Nombre de nouvelles cartes par jour par défaut
    themeLevels: {} as Record<number, number>, // Stocke le niveau choisi pour chaque thème
    programName: '', // Nom du programme de révision
    programId: null as number | null, // ID du programme de révision
    programs: [] as { id: number; name: string; themes: { id: number; name: string }[]; dailyNewCards: number; themeLevels: Record<number, number> }[], // Liste des programmes de révision
  }),

  getters: {
    getThemeLevel: (state) => (themeId: number) => state.themeLevels[themeId] || 1,
  },

  actions: {
    selectThemes(themes: { id: number; name: string }[]) {
      this.selectedThemes = themes
    },

    setDailyNewCards(value: number) {
      this.dailyNewCards = value
    },

    setThemeLevel(themeId: number, level: number) {
      this.themeLevels[themeId] = level
    },

    setProgramName(name: string) {
      this.programName = name
    },

    startRevision() {
      // Générer un ID unique pour le programme si ce n'est pas déjà fait
      if (this.programId === null) {
        this.programId = generateUniqueId();
      }
      console.log('Début de la révision avec les paramètres suivants :', this.selectedThemes, this.dailyNewCards, this.themeLevels)
      // Sauvegarde du programme dans le local storage
      const program = {
        id: this.programId,
        name: this.programName,
        themes: this.selectedThemes,
        dailyNewCards: this.dailyNewCards,
        themeLevels: this.themeLevels,
      };
      // Récupérer la liste existante des programmes
      const existingPrograms = JSON.parse(localStorage.getItem('revisionPrograms') || '[]');
      // Ajouter le nouveau programme à la liste
      existingPrograms.push(program);
      // Sauvegarder la liste mise à jour dans le local storage
      localStorage.setItem('revisionPrograms', JSON.stringify(existingPrograms));
      // Mettre à jour l'état local
      this.programs = existingPrograms;
    },
  },
})
