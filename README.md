🛡️ ShareEase : Écosystème Cloud Sécurisé (Full-Stack)
ShareEase est une plateforme de mise en relation entre prestataires et clients, désormais déployée sur une infrastructure Cloud distribuée. Ce projet démontre la mise en œuvre de la Programmation Sécurisée, du modèle STRIDE et de la gestion d'environnements de production réels.

🏗️ 1. Architecture Système Distribuée
L'application utilise une architecture moderne découplée, garantissant une haute disponibilité et une sécurité accrue :

Frontend (Vercel) : Interface développée en Next.js 14, déployée sur Vercel pour bénéficier d'une distribution mondiale via CDN.

Backend (Render) : API REST construite avec Node.js et Express, hébergée sur Linux (Render).

Base de Données : SQLite embarquée côté serveur pour une gestion relationnelle SQL performante et portable.

🔐 2. Modèle de Sécurité et DevOps
La sécurité a été renforcée lors du passage en production pour répondre aux contraintes du Cloud :

Hachage Cryptographique : Utilisation de Bcryptjs (bibliothèque portable) avec 10 tours de "salt" pour protéger les mots de passe contre les attaques par force brute.

Contrôle d'Accès (RBAC) : Système de Role-Based Access Control strict filtrant les accès Admin, Fournisseur et Client.

Sécurité des Transmissions (CORS) : Configuration avancée des en-têtes CORS pour autoriser uniquement les communications entre le domaine Vercel et l'API Render.

Hygiène du Dépôt (DevOps) : Exclusion systématique des dépendances natives (node_modules) et des fichiers binaires Windows pour garantir une compilation propre sur les serveurs Linux.

SSL/TLS : Communications entièrement chiffrées via HTTPS sur l'ensemble du réseau.

👥 3. Fonctionnalités Cloud par Rôle
🔸 Administration Système
Monitoring Live : Statistiques en temps réel sur l'état de la base de données SQLite.

Audit STRIDE : Journalisation des accès et des actions sensibles visible dans le panneau de contrôle.

🔸 Espace Fournisseur (Pro)
Gestion Distante : Publication de services avec injection d'URL d'images dynamiques.

Workflow Commandes : Réception et traitement des commandes clients avec mise à jour instantanée du statut dans le Cloud.

🔸 Espace Client
Exploration et Filtres : Recherche dynamique parmi les services stockés sur Render.

Suivi de Commande : Interface de suivi en temps réel (Acceptée/Refusée) avec notifications persistantes.

🔌 4. Documentation de l'API (Production)
L'API est accessible via l'endpoint sécurisé : https://shareease-uyub.onrender.com/api

POST /register : Création de compte avec hachage Bcrypt.

GET /services : Extraction du catalogue depuis SQLite.

PATCH /orders/:id : Transition d'état sécurisée pour les commandes.

DELETE /users/:id : Suppression administrative avec intégrité référentielle (Cascading Deletes).

⚙️ 5. Déploiement et Maintenance
Déploiement Cloud
Backend : Automatisé sur Render via branche main (Linux).

Frontend : Automatisé sur Vercel avec injection de variables d'environnement (NEXT_PUBLIC_API_URL).

Procédure de mise à jour locale
Bash

# Pour mettre à jour l'application, poussez simplement sur GitHub :
git add .
git commit -m "Update: description de la modification"
git push origin main
Le CI/CD de Vercel et Render se chargera de reconstruire l'application en quelques minutes.

© 2026 - ShareEase - Excellence en Programmation Sécurisée & Cloud Computing
