const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Constante des routes

// Variable d'environnement
require('dotenv').config();

const app = express();

// Logger les 'request' & 'response'
app.use(morgan('dev'));

// Permet de communiquer entre les deux serveurs
mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_password}@${process.env.db_cluster}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
// Ce header permet d'accéder à notre API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Origin', '*');
// Ce header permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// Ce header permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Les routes

module.exports = app;