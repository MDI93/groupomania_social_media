## Groupomania - Réseau social d'entreprise ##

GROUPOMANIA est un groupe spécialisé dans la grande distribution et souhaite construire un réseau social interne pour les employés de l'entreprise.

--------------------------------------------------
Technologies utilisées:
Node.js - Express.js - React.js - MongoDB - Sass

--------------------------------------------------
INSTALLATION

Prérequis :

Il vous faut avoir installé sur votre machine :

Git : https://git-scm.com/downloads
Node.js : https://nodejs.org/en/

Créer un dossier vide puis cloner ce repository à l'intérieur :
git clone https://github.com/MDI93/groupomania_social_media.git

--------------------------------------------------
L'API se connecte à une base de donnée MongoDB.
Au besoin, il faut également modifier le fichier .ENV afin de mettre vos propres identifiants de connexion à votre BDD.

MongoDB : https://www.mongodb.com/fr-fr

--------------------------------------------------
BACK END

Ouvrir le dossier 'back' dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

npm start ou nodemon serve

Créer un dossier '/images'

--------------------------------------------------
FRONT END

Ouvrir le dossier 'front' dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

yarn start

Ouvrir le navigateur a l'adresse http://localhost:3000/

--------------------------------------------------
Fonctionnalités :

Le site permet de:

    Créer des posts (avec ou sans photos)
    Liker des posts
    Modifier et supprimer un post

Un compte admin est présent pour la modération (suppression des posts et commentaires d'autres utilisateurs). 
Voici les codes d'accès admin : 

admin@test.fr
Azerty22