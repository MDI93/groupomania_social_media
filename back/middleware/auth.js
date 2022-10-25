const jwt = require('jsonwebtoken');

// Variable d'environnement
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.token_key}`);
        const userId = decodedToken.userId;
        const role = decodedToken.role
            req.auth = {
                userId: userId,
                role: role
            };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};