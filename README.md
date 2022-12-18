# ProjetJS

## Configuration

Logiciel :

Installation de nodemon

Mac/Linux : npm install nodemon --save-dev
Windows : npm install -g nodemon

Installation des dépendances :
npm install sqlite3
npm install body-parser

Voir si node et npm sont installés (retourne le n° de version si c'est le cas)
node -v
npm -v

Lancement du serveur :
npm run start

URL du site :
http://localhost:8080/

Clé authentification:
nom : admin
mdp : admin123

## Ajout de rendez-vous

Possible d'ajouter un rendez-vous depuis n'importe quelle vue

## Modification de rendez-vous

Cliquer sur le rendez-vous en question.
* mettre à jour en cliquant sur valider
* supprimer en cliquant sur le bouton en question

## Mois

Les rendez-vous sont affichés sous forme de boutons dans le calendrier en fonction du début du rendez-vous.

## Semaine

Les rendez-vous sont placés en fonction de l'heure et du jour de départ.

## Jour

Les rendez-vous sont placés en fonction de l'heure de départ.

## API curl

Seul GET est fonctionnel.

Liste de tous les rendez-vous :

* curl -i http://localhost:8080/agenda/


Voir un rendez-vous particulier :

* curl -i http://localhost:8080/agenda/85