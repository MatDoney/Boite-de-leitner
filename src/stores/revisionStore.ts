import { defineStore } from 'pinia'

// Fonction pour générer un UUID unique
function generateUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useRevisionStore = defineStore('revision', {
  state: () => ({
    selectedThemes: [] as { id: number; name: string }[], // Liste des thèmes sélectionnés pour la révision
    dailyNewCards: 5, // Nombre de nouvelles cartes par jour par défaut
    themeLevels: {} as Record<number, number>, // Stocke le niveau choisi pour chaque thème
    programName: '', // Nom du programme de révision
    programId: null as string | null, // ID du programme de révision
    notification: false as Boolean, // Notification de révision
    programs: [] as { id: string; name: string; themes: { id: number; name: string }[]; dailyNewCards: number; themeLevels: Record<number, number> }[], // Liste des programmes de révision
    notificationTime: '09:00', // Heure par défaut pour la notification
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

    setNotification(value: Boolean) {
      this.notification = value
    },

    setNotificationTime(time: string) {
      this.notificationTime = time;
    },

    startRevision() {
      // Générer un ID unique pour le programme
      const programId = generateUniqueId();

      console.log('Début de la révision avec les paramètres suivants :', this.selectedThemes, this.dailyNewCards, this.themeLevels);

      // Sauvegarde du programme dans le local storage
      const program = {
        id: programId, // Utiliser un nouvel ID unique
        name: this.programName,
        themes: JSON.parse(JSON.stringify(this.selectedThemes)), // Cloner les thèmes sélectionnés
        dailyNewCards: this.dailyNewCards,
        themeLevels: { ...this.themeLevels }, // Cloner les niveaux des thèmes
        notification: this.notification,
      };

      // Récupérer la liste existante des programmes
      const existingPrograms = JSON.parse(localStorage.getItem('revisionPrograms') || '[]');

      // Ajouter le nouveau programme à la liste
      existingPrograms.push(program);

      // Sauvegarder la liste mise à jour dans le local storage
      localStorage.setItem('revisionPrograms', JSON.stringify(existingPrograms));

      // Mettre à jour l'état local
      this.programs = existingPrograms;

      // Réinitialiser les données locales pour éviter les conflits avec les futurs programmes
      this.selectedThemes = [];
      this.dailyNewCards = 5;
      this.themeLevels = {};
      this.programName = '';
    },

    scheduleDailyNotification( notificationTime :string) {
      if (!this.notification || !this.programName) return;

      const notificationTitle = `C'est l'heure de réviser ${this.programName}`;
      const notificationOptions = {
        body: 'Cliquez ici pour commencer votre session de révision.',
        
      };

      // Planifier une notification quotidienne
      const now = new Date();
      const [hours, minutes] = notificationTime.split(':').map(Number);
      const nextNotificationTime = new Date();
      nextNotificationTime.setHours(hours, minutes, 0, 0); // Utiliser l'heure définie par l'utilisateur
      if (now > nextNotificationTime) {
        nextNotificationTime.setDate(nextNotificationTime.getDate() + 1); // Si l'heure est passée, planifier pour le lendemain
      }

      const delay = nextNotificationTime.getTime() - now.getTime();
      console.log('Notification planifiée dans', delay, 'millisecondes');
      setTimeout(() => {
        new Notification(notificationTitle, notificationOptions);
        this.scheduleDailyNotification(notificationTime); // Replanifier pour le jour suivant
      }, delay);
    },
  },
})
