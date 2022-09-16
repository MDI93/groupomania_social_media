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
    const emailCryptoJs = cryptoJs.HmacSHA384(req.body.email, `${process.env.crypto_key}`).toString();
    bcrypt.hash(req.body.password, 12)
        .then(hash => {
            const user = new User({
                email: emailCryptoJs,
                password: hash
            })
            console.log("-- email & mdp crypté -->", user)
            user.save()
                .then(() => res.status(201).json({ message: 'New account has been created !'}))
                .catch((error) => res.status(401).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const emailCryptoJs = cryptoJs.HmacSHA384(req.body.email, `${process.env.crypto_key}`).toString();
    User.findOne({ email: emailCryptoJs })
    .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Incorrect username/password pair' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Incorrect username/password pair' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                { userId: user._id },
                `${process.env.token_key}`,
                { expiresIn: '1h' },
                )
            });  
        })
        .catch(error => res.status(500).json({ error })); 
    })
    .catch(error => res.status(500).json({ error }));
};
