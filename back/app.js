const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

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


app.use((req, res, next) => {
    res.status(200).json({ message: 'ca marche' });
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

module.exports = app;