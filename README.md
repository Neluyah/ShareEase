Je comprends parfaitement, tu as raison : pour un dépôt GitHub et un dossier de TP, il faut que le **README** soit ultra-complet pour qu'on voie ton expertise technique au premier coup d'œil.

Voici une version "Expert" qui détaille absolument tout : l'architecture, la sécurité avancée, les routes API et même la gestion des erreurs.

---

# 🛡️ ShareEase : Écosystème de Services Sécurisé (Full-Stack)

**ShareEase** est une application web complète de mise en relation entre prestataires et clients. Ce projet a été conçu en respectant les principes de la **Programmation Sécurisée** et du modèle **STRIDE** pour garantir l'intégrité et la confidentialité des échanges.

##  Table des Matières

1. [Architecture Système]
2. [Modèle de Sécurité (Cyber)]
3. [Fonctionnalités par Rôle]
4. [Documentation de l'API]
5. [Installation et Déploiement]
6. [Perspectives d'Évolution]

---

## 🏗️ 1. Architecture Système <a name="architecture"></a>

L'application repose sur une architecture découplée (Client-Serveur) :

* **Frontend** : Framework **Next.js 14** utilisant les *Client Components* pour une interface réactive et **Tailwind CSS** pour un design premium.
* **Backend** : Serveur **Node.js** avec **Express**, gérant la logique métier et les restrictions d'accès.
* **Base de Données** : **SQLite**. Un choix stratégique pour la portabilité et la gestion relationnelle via SQL (Clés étrangères, Intégrité).

---

## 🔐 2. Modèle de Sécurité (Cyber) <a name="sécurité"></a>

La sécurité n'est pas une option mais le cœur du projet :

* **Hachage Cryptographique** : Utilisation de **Bcrypt** avec 10 tours de "salt" pour le stockage des mots de passe. Aucun mot de passe ne circule ou n'est stocké en clair.
* **Contrôle d'Accès (RBAC)** : Système de *Role-Based Access Control* implémenté côté Client (redirections) et côté Serveur (filtrage des données).
* **Protection contre l'Élévation de Privilèges** : Un client ne peut pas accéder aux routes `/admin` ou `/dashboard` (vendeur).
* **Logs d'Audit (STRIDE)** : Journalisation en temps réel des actions sensibles (connexions, modifications de base de données) visible uniquement par l'administrateur.
* **Intégrité Référentielle** : Gestion des **Cascading Deletes**. Si un service est supprimé, toutes les commandes associées sont nettoyées automatiquement pour éviter les données orphelines.

---

## 👥 3. Fonctionnalités par Rôle <a name="rôles"></a>

### 🔸 Espace Administrateur

* **Dashboard de Monitoring** : Statistiques en temps réel (nombre d'utilisateurs, de services).
* **Modération** : Possibilité de supprimer n'importe quel compte ou service inapproprié.
* **Surveillance** : Consultation des logs système sécurisés.

### 🔸 Espace Fournisseur (Pro)

* **Gestion du Catalogue** : Ajout de nouveaux services avec titre, prix, catégorie et **URL d'image dynamique**.
* **Modification Rapide** : Système d'édition en direct des prix et des descriptions depuis le dashboard.
* **Traitement des Commandes** : Interface permettant d'accepter ou de refuser les demandes des clients en un clic.

### 🔸 Espace Client

* **Catalogue Public** : Recherche et filtrage des services par catégorie.
* **Passage de Commande** : Système de commande sécurisé lié à l'ID du fournisseur.
* **Profil Personnel** : Suivi du statut des commandes (En attente, Acceptée, Refusée) et gestion des informations personnelles.

---

## 🔌 4. Documentation de l'API <a name="api"></a>

Quelques-unes des routes principales développées :

* `POST /api/register` : Création sécurisée d'un compte.
* `GET /api/services` : Récupération du catalogue complet.
* `PUT /api/services/:id` : Mise à jour des données d'un service (Vendeur uniquement).
* `PATCH /api/orders/:id` : Changement de statut d'une commande.
* `DELETE /api/users/:id` : Suppression d'un compte (Admin uniquement).

---

## ⚙️ 5. Installation <a name="installation"></a>

1. **Cloner le dépôt** : `git clone [URL_DU_DEPOT]`
2. **Lancer le Serveur** :
```bash
cd backend
npm install
node server.js

```


3. **Lancer l'Interface** :
```bash
cd shareease-ui
npm install
npm run dev

```


4. **Scripts Utiles** :
* `node set-admin.js` : Pour créer l'administrateur système.
* `node update-db.js` : Pour mettre à jour la structure SQLite sans perdre les données.



---

## 🔮 6. Évolutions Futures <a name="évolutions"></a>

* **Déploiement HTTPS** : Mise en place de certificats SSL/TLS pour chiffrer les échanges en production.
* **Tokens JWT** : Implémentation de JSON Web Tokens pour une gestion de session encore plus sécurisée.
* **Paiement Intégré** : Connexion à l'API Stripe pour finaliser les commandes.

---

**© 2026 - ShareEase - Projet de Programmation Sécurisée**

---
