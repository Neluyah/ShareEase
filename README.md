## 🛡️ ShareEase : Écosystème Cloud Sécurisé (Full-Stack)

ShareEase est une plateforme web d'économie du partage permettant la mise en relation sécurisée entre prestataires et clients. Ce projet a été développé en suivant un cycle de vie de développement logiciel sécurisé (SDLC sécurisé) pour garantir la protection des données et des utilisateurs.



### 🏗️ 1. Architecture Système Distribuée
L'application repose sur une architecture client-serveur moderne, découplée et entièrement déployée dans le Cloud :

- Frontend : Développé avec Next.js 14 et Tailwind CSS, hébergé sur Vercel.

- Backend : API REST construite avec Node.js et Express, hébergée sur Render (environnement Linux).

- Base de Données : SQLite. Un choix stratégique pour l'intégrité référentielle et la portabilité des données via SQL.


### 🔐 2. Modèle de Sécurité (Analyse STRIDE)
Conformément aux exigences du projet, nous avons identifié et atténué une menace concrète par catégorie du modèle STRIDE:

| Catégorie | Menace Identifiée | Mesure d'Atténuation (Mitigation) |
| :--- | :--- | :--- |
| **S**poofing | Usurpation d'identité lors de la connexion. | Authentification forte et gestion sécurisée des sessions. |
| **T**ampering | Modification non autorisée du prix d'un service. | Validation stricte côté serveur et requêtes SQL paramétrées. |
| **R**epudiation | Un utilisateur nie avoir passé une commande. | Journalisation (Logs) immuable des transactions en base de données. |
| **I**nformation | Fuite de mots de passe en cas de compromission. | Hachage avec **Bcrypt** (10 rounds de salt). |
| **D**enial of Service | Saturation des points d'accès API. | Limitation du débit (Rate Limiting) sur les routes sensibles. |
| **E**levation | Accès client aux fonctions d'administration. | Contrôle d'accès basé sur les rôles (**RBAC**) rigoureux. |


### 👥 3. Fonctionnalités par Rôle (RBAC)
Le système applique le principe du moindre privilège pour chaque type d'utilisateur:

🔸 Administrateur (Gestion & Surveillance)

Monitoring : Statistiques en temps réel sur les utilisateurs et services.

Modération : Suppression de comptes ou de contenus inappropriés.

Audit : Consultation des logs de sécurité système.

🔸 Fournisseur (Gestion du Catalogue)

Publication : Ajout de services avec titres, prix et images dynamiques.


Édition : Mise à jour rapide des offres depuis le dashboard fournisseur.


Commandes : Acceptation ou refus des demandes clients en un clic.

🔸 Client (Consommation de Services)

* Exploration : Recherche et filtrage par catégories.


* Workflow : Passage de commande sécurisé et suivi du statut en temps réel.


* Profil : Gestion des informations personnelles et historique.



⚙️ 4. Installation et Déploiement <a name="installation"></a>
Le projet utilise des pratiques DevOps pour garantir la sécurité. 

Pré-requis
Node.js (v18+)

npm

Installation Locale
Cloner le dépôt :

Bash

git clone [URL_DU_REPO]
Lancer le Serveur (Backend) :

Bash

cd backend
npm install
node server.js
Lancer l'Interface (Frontend) :

Bash

cd shareease-ui
npm install
npm run dev
Sécurité du Déploiement Cloud

Secrets : Utilisation de variables d'environnement (.env) isolées (jamais commit). 


CI/CD : Déploiement automatisé sur Vercel et Render. 


Communication : Chiffrement HTTPS/TLS activé sur tous les échanges.


### 🔮 5. Perspectives d'Évolution

* Authentification MFA : Intégration de codes TOTP pour les comptes administrateurs.


* Paiement Intégré : Connexion à l'API Stripe pour sécuriser les transactions financières.


* JWT avancés : Implémentation de Refresh Tokens pour une gestion de session encore plus robuste.

