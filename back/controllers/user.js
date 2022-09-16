// Modèle utilisateur
const User = require('../models/User');
// Hash le mot de passe
const bcrypt = require('bcrypt');
// Crypter l'adresse mail
const cryptoJs = require('crypto-js');
// Utiliser un token valide
const jwt = require('jsonwebtoken');

// Variable d'environnement 
require('dotenv').config();

exports.signup = (req, res, next) => {
    console.log('signup fonctionne')
    res.status(201).json({ message: "Account created !"})
};

exports.login = (req, res, next) => {
    console.log('login fonctionne')

};
