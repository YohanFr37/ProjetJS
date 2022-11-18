# ProjetJS

## Design Pattern Projet

Dans ce projet, vous devez développer en groupe une application Web avec une architecture client-serveur pour gérer des agendas.

### Détails pratiques

Vous travaillerez par équipe de trois étudiants. Pensez à déclarez votre équipe sur arche avec un lien vers le dépôt de votre projet. Celui-ci est à rendre pour le 18 décembre 2022. Vous devrez marquer la version finale avec le tag release.

### Cahier des charges

Le serveur stocke toutes les données utilisateurs et les synchronise en temps réel avec les clients.
La sécurité n'est pas à prendre en compte. Une authenti^\cation par simple login ou avec un mot de passe en clair est suffisant.
La persistance des données peut se faire par un fichier (CSV, json, . . .). Vous n'avez pas à déployer une base de données.
Depuis le client Web, l'utilisateur doit pouvoir :

* Visualiser ses rendez-vous par jour, semaine ou mois.
* Ajouter un rendez-vous en indiquant son titre, sa date et sa durée.
* Modifier ou supprimer un rendez-vous.

Vous devez fournir une API documentée qui explique comment réaliser ces opérations de manière extérieure (par exemple via curl). Le format des requêtes à réaliser et celui des données transmises sont libres. 
La documentation technique indiquera comment réaliser les requêtes et analyser les réponses.
La documentation devra expliquer clairement les commandes à réaliser pour lancer le serveur en local et la manière d'obtenir le client Web (fichier en dur ou page renvoyée dynamiquement par une requête).

### Critères d'évaluation
* Le respect du cahier des charges est le premier critère d'évaluation.
* La stabilité du serveur et de l'application Web sont importantes.
* L'ergonomie et le design de la page seront considérés.
* Des points (2-3 au maximum) seront attribués pour des fonctionnalités supplémentaires pertinentes.
