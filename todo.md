# Wallet App - Todo List

## Fonctionnalités de base (Gratuites)

### Authentification et gestion des utilisateurs

- [x] Backend : Authentification JWT
- [x] Backend : Modèle `User`
- [x] Backend : Routes d'inscription / connexion
- [x] Backend : Validation email
- [x] Backend : Gestion du profil utilisateur
- [x] Frontend : Formulaires inscription / connexion
- [ ] Backend : Réinitialisation de mot de passe
- [ ] Frontend : Formulaire mot de passe oublié / reset
- [x] Frontend : Page de profil utilisateur

### Revenus – Ajouter un revenu manuellement

- [x] Backend : Modèle `Income`
- [x] Backend : Routes CRUD
- [x] Backend : Création des catégories
- [x] Backend : Validation des données (Zod/Prisma)
- [x] Frontend : Formulaire de création / édition
- [x] Frontend : Sélecteur de catégorie
- [x] Backend/frontend : Ajout du jour de réception

### Dépenses – Ajouter une charge mensuelle

- [x] Backend : Modèle `Expense`
- [x] Backend : Routes CRUD
- [x] Backend : Création des catégories
- [x] Backend : Validation des données
- [x] Frontend : Formulaire de création / édition
- [x] Frontend : Sélecteur de catégorie
- [x] Backend/frontend : Ajout du jour de prélèvement

### Statistiques - Calculs

- [ ] Backend : Calculs de ratios financiers (taux d'épargne, etc.)

### Visualisation & tableau de bord

- [x] Frontend : Dashboard principal
- [ ] Frontend : Graphique de répartition par catégorie
- [ ] Frontend : Graphique d'évolution dans le temps
- [ ] Frontend : Rapports mensuels / annuels

### Interface utilisateur

- [x] Frontend : Design responsive (mobile / desktop)
- [x] Frontend : Composants UI réutilisables
- [x] Frontend : Thème clair/sombre
- [ ] Frontend : Accessibilité (aria, clavier, contrastes)
- [ ] Frontend : Tests d'utilisabilité

## Version Premium (Abonnement Stripe)

### Intégration Stripe

- [ ] Backend : Intégration Stripe (SDK / API)
- [ ] Backend : Plans d'abonnement + webhooks
- [ ] Frontend : Page de tarification
- [ ] Frontend : Composant de paiement
- [ ] Backend : Facturation récurrente
- [ ] Backend : Gestion des remboursements

### Analyse comparative avec la BCE

- [ ] Backend : Intégration des données BCE (mock ou import initial)
- [ ] Backend : Algorithmes de comparaison (règles par catégorie)
- [ ] Backend : Calculs personnalisés par utilisateur
- [ ] Frontend : Visualisation des écarts avec la moyenne BCE
- [ ] Frontend : Recommandations personnalisées
- [ ] Backend : Notifications sur écarts significatifs

## Infrastructure & DevOps

### Backend

- [x] Architecture générale + config Prisma
- [x] Implémentation des routes API
- [ ] Optimisations des perfs (pagination, indexes)
- [ ] Sécurité (rate limit, injection, sanitisation)
- [ ] Tests automatisés (unitaires + intégration)
- [ ] Documentation Swagger / Redoc

### Frontend

- [x] Setup Next.js
- [x] Setup Tailwind CSS
- [ ] Optimisation du bundle
- [ ] Implémentation SSR/SSG si besoin
- [ ] Tests automatisés (Jest, Cypress)
- [ ] Storybook ou doc des composants

### CI/CD & Déploiement

- [x] GitHub Actions
- [x] Déploiement auto (prod/préprod)
- [ ] Amélioration du pipeline (lint, test, preview)
- [ ] Monitoring / alertes
- [ ] Sauvegardes automatiques BDD
- [ ] Documentation du processus de déploiement

## Documentation & Support

### Utilisateur

- [ ] Guide d'utilisation
- [ ] Tutoriels vidéos
- [ ] FAQ
- [ ] Présentation des fonctionnalités premium
- [ ] Exemples d'usage

### Technique

- [ ] Documentation de l'architecture
- [ ] Documentation des API
- [ ] Modèles de données
- [ ] Déploiement
- [ ] Tests

### Internationalisation

- [x] i18n + l10n (Next-intl)
- [ ] Gestion des devises
- [ ] Conformité légale
- [ ] Formats de dates / nombres locaux
