// Permettre lors de l'authentification d'avoir un mot de passe fort
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.is().max(50)                                  
.has().uppercase(1)                              
.has().lowercase()                             
.has().digits(1)                                
.has().not().spaces()                    

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ 
            error: `Your password must be changed with atleast ${passwordSchema.validate('req.body.password', { list: true })}`
        })
    }
}

