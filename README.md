# Wallet Application

Ce projet est une application de gestion de portefeuille (wallet) qui permet aux utilisateurs de visualiser leurs dépenses pour mieux comprendre leurs habitudes de dépenses.

## Structure du Projet

Le projet est divisé en deux parties principales :

### Frontend (`/frontend`)

- Application web construite avec Next.js
- Interface utilisateur moderne et responsive
- Styling avec Tailwind CSS
- TypeScript pour un développement type-safe

### Backend (`/backend`)

- API REST construite avec Node.js
- Base de données gérée avec Prisma ORM
- TypeScript pour un développement type-safe
- Documentation API avec Postman

## Technologies Utilisées

### Frontend

- **Next.js** - Framework React pour le développement web
- **TypeScript** - Langage de programmation typé
- **Tailwind CSS** - Framework CSS utility-first
- **ESLint & Prettier** - Outils de linting et de formatage de code

### Backend

- **Node.js** - Environnement d'exécution JavaScript
- **TypeScript** - Langage de programmation typé
- **Prisma** - ORM moderne pour la gestion de base de données
- **Postman** - Documentation et tests d'API

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Base de données (configurée dans le backend)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Configuration

Les fichiers `.env` sont nécessaires pour le frontend et le backend. Assurez-vous de les configurer correctement en suivant les exemples fournis dans les dossiers respectifs.

## Documentation

- La documentation de l'API est disponible dans le fichier `routes.md` du backend
- Les collections Postman sont disponibles dans le fichier `postman.json`
- Chaque partie du projet (frontend et backend) possède son propre README avec des instructions détaillées

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
