# API Routes

## Authentification et gestion de l'utilisateur

- **`POST /auth/register`**  
  Crée un nouvel utilisateur.  
  **Paramètres requis** : `email`, `password`, `name` (optionnel : `avatar`).

- **`POST /auth/login`**  
  Authentifie un utilisateur et retourne un `accessToken` et un `refreshToken`.  
  **Paramètres requis** : `email`, `password`.

- **`POST /auth/refresh`**  
  Réutilise un `refreshToken` pour générer un nouveau `accessToken`.  
  **Paramètres requis** : `refreshToken`.

- **`POST /auth/logout`**  
  Invalide le `refreshToken` du user pour le déconnecter.

- **`GET /user/profile`**  
  Récupère les informations du profil de l'utilisateur connecté.  
  **Authentification requise** : Bearer token.

- **`DELETE /user/profile`**  
  Supprime le compte de l'utilisateur connecté.  
  **Authentification requise** : Bearer token.

- **`PUT /user/profile`**  
  Met à jour les informations du profil de l'utilisateur connecté (par exemple, `name`, `avatar`).  
  **Authentification requise** : Bearer token.

---

## Gestion des revenus (Incomes)

- **`GET /incomes`**  
  Récupère la liste de tous les revenus de l'utilisateur connecté, avec une option pour filtrer par mois ou année.  
  **Authentification requise** : Bearer token.

- **`POST /incomes`**  
  Ajoute un revenu pour l'utilisateur connecté.  
  **Paramètres requis** : `label`, `amount` (optionnel : `category`).

- **`GET /incomes/:id`**  
  Récupère les détails d'un revenu spécifique.  
  **Authentification requise** : Bearer token.

- **`PUT /incomes/:id`**  
  Met à jour un revenu spécifique.  
  **Paramètres requis** : `label`, `amount` (optionnel : `category`).

- **`DELETE /incomes/:id`**  
  Supprime un revenu spécifique.

---

## Gestion des dépenses (Expenses)

- **`GET /expenses`**  
  Récupère la liste de toutes les dépenses de l'utilisateur connecté, avec des options pour filtrer par mois ou année.  
  **Authentification requise** : Bearer token.

- **`POST /expenses`**  
  Ajoute une dépense pour l'utilisateur connecté.  
  **Paramètres requis** : `label`, `amount` (optionnel : `category`).

- **`GET /expenses/:id`**  
  Récupère les détails d'une dépense spécifique.  
  **Authentification requise** : Bearer token.

- **`PUT /expenses/:id`**  
  Met à jour une dépense spécifique.  
  **Paramètres requis** : `label`, `amount` (optionnel : `category`).

- **`DELETE /expenses/:id`**  
  Supprime une dépense spécifique.

---

## Statistiques et analyses

- **`GET /stats/overview`**  
  Récupère un résumé des finances mensuelles de l'utilisateur, incluant total des `incomes`, des `expenses`, et solde
  net ainsi que l'`income` le plus élevé et l'`expense` la plus haute.  
  **Authentification requise** : Bearer token.

- **`GET /stats/categories`**  
  Récupère les données financières par catégorie pour une visualisation détaillée (utile pour des graphiques par
  catégorie de dépenses et revenus).  
  **Authentification requise** : Bearer token.

---

## Résumé de l'architecture de l'API

1. **Auth (authentification)** : `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
2. **User** : `/user/profile`
3. **Incomes** : `/incomes`, `/incomes/:id`
4. **Expenses** : `/expenses`, `/expenses/:id`
5. **Stats** : `/stats/overview`, `/stats/categories`
