# Boite-de-leitner

Ce projet est une application web développée avec Vue 3 et Vite, permettant de gérer des cartes de révision selon la méthode de Leitner. L'application inclut des fonctionnalités pour créer, organiser et réviser des cartes, ainsi que pour personnaliser les programmes de révision.

## Structure du projet

Le dossier `src` contient les fichiers principaux de l'application. Voici un aperçu de sa structure et de ses fonctionnalités :

### 1. **App.vue**
Le composant racine de l'application. Il inclut le menu de navigation et le routeur Vue.

### 2. **main.ts**
Le point d'entrée de l'application. Il configure Vue, Pinia (gestion d'état) et Vue Router.

### 3. **assets/**
Contient les fichiers statiques tels que les styles CSS et les images :
- `base.css` : Définit les styles de base et les variables CSS.
- `main.css` : Applique les styles globaux à l'application.
- Images : `liste.png`, `maison.png`, `mallette.png`, `plus.png`, `utilisateur.png`.

### 4. **components/**
Contient les composants réutilisables de l'application :
- **Card.vue** : Affiche une carte de révision avec des options pour augmenter ou réinitialiser son niveau.
- **CardForm.vue** : Formulaire pour créer ou modifier une carte.
- **CategoriesForm.vue** : Formulaire pour ajouter ou modifier une catégorie.
- **CategoriesList.vue** : Liste des catégories disponibles.
- **HelloWorld.vue** : Composant d'exemple.
- **Menu.vue** : Menu de navigation principal.
- **RevisionSettings.vue** : Interface pour configurer un programme de révision.
- **ThemeForm.vue** : Formulaire pour ajouter ou modifier un thème.
- **ThemeList.vue** : Liste des thèmes associés à une catégorie.
- **icons/** : Contient des icônes SVG pour l'interface utilisateur.

### 5. **router/**
- `index.ts` : Configure les routes de l'application, telles que l'accueil, les catégories, les thèmes, la création de cartes, et les programmes de révision.

### 6. **stores/**
Utilise Pinia pour gérer l'état global de l'application :
- **CardStore.ts** : Gère les cartes de révision (ajout, modification, suppression, sauvegarde dans le localStorage).
- **categories.ts** : Gère les catégories (ajout, modification, suppression, sauvegarde dans le localStorage).
- **counter.ts** : Exemple de store pour un compteur.
- **revisionStore.ts** : Gère les programmes de révision, y compris les notifications.
- **themesStore.ts** : Gère les thèmes associés aux catégories.

### 7. **views/**
Contient les vues principales de l'application :
- **AboutView.vue** : Page "À propos".
- **CardCreationVue.vue** : Vue pour créer une nouvelle carte.
- **CardsList.vue** : Affiche les cartes d'un thème ou d'un programme de révision.
- **CategoriesView.vue** : Vue pour gérer les catégories et leurs thèmes.
- **HomeVue.vue** : Page d'accueil listant les programmes de révision.
- **RevisionStart.vue** : Vue pour configurer et démarrer une session de révision.
- **ThemesView.vue** : Vue pour gérer les thèmes d'une catégorie.

## Fonctionnalités principales

- **Gestion des cartes** : Créez, modifiez et supprimez des cartes de révision.
- **Organisation par catégories et thèmes** : Classez les cartes dans des catégories et thèmes personnalisés.
- **Programmes de révision** : Configurez des programmes avec des thèmes sélectionnés, un nombre de nouvelles cartes par jour, et des notifications.
- **Notifications** : Recevez des rappels pour vos sessions de révision.
- **Sauvegarde locale** : Les données sont stockées dans le `localStorage` pour une persistance locale.

## Installation et exécution

### Prérequis
- Node.js (version 16 ou supérieure)
- npm (ou yarn)

### Étapes

1. Clonez le dépôt :
   '''
   git clone <url-du-repo>
   cd Boite-de-leitner
   '''

2. Installez les dépendances :
   '''
   npm install
   '''

3. Lancez le serveur de développement :
   '''
   npm run dev
   '''

4. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:5173](http://localhost:5173).

### Compilation pour la production
   '''
   npm run build
   '''

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour signaler des bugs ou proposer des améliorations.

## Licence

Ce projet est sous licence Apache 2.0. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.