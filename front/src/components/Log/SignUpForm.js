import React, { useState } from "react";
import LoginForm from "./LoginForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

// Requête pour s'inscrire
    const handleSignUp = (event) => {
        event.preventDefault();  
        
    setIsLoading(true);

// Vérifie si les inputs sont vides
    if(email.trim().length === 0 || password.trim().length === 0){
        setError({
            message: "Entrer votre adresse e-mail et/ou votre mot de passe."
        })
        return;
    };

// Vérifie le format de l'adresse e-mail
    let verifEmail = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-{1,3}]+)*$/
    const regexEmail = (value) => {
        return verifEmail.test(value)
    };
    if(!regexEmail(email)){
        setError({
            regexEmail: "Veuillez entrer une adresse e-mail valide."
        })
        return;
    };

// Vérifie les caractères a utiliser pour le mot de passe
    let verifPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const regexpassword = (value) => {
        return verifPassword.test(value)
    };

    if(!regexpassword(password)){
        setError({
            regexPassword: "Mot de passe doit contenir au minimum 8 caractères, et au moins un chiffre et une majuscule"
        })
        return;
    };

    const url = "http://localhost:4000/api/auth/signup"
    const fetchPost = async () => {
        try{
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify ({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type" : "application/json"
                }
            })
    setIsLoading(false)        
            const responseData = await response.json();
            if(response.ok) {
                setData(responseData);
                setFormSubmit(true);
            } else {
                setError(responseData.error);  
            } 
            if(responseData && responseData.error){
                setError({
                    takenEmail: "Cet adresse e-mail existe déjà."
                })
            } 
        } catch(error) {
            console.log(error)
        }
    } 
        fetchPost()
    }
    return(
        <>
        {formSubmit ? (
        <>    
            <LoginForm />
            {alert("Bravo! vous êtes inscrit, veuillez-vous connecter.")}
        </>    
            ) : (
        <form action="" onSubmit={handleSignUp} id="signup-form" className="form-signup-container">
            <label htmlFor="email" className="form-label">Créer un nouveau compte</label>
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input 
                className="form-input"  
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {error && 
            <span className="form-signup-error">{error.regexEmail}</span> }
            {error && 
            <span className="form-signup-error">{error.takenEmail}</span> }
            <label htmlFor="email" className="form-label">Mot de passe</label>
            <input
                className="form-input" 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {error && 
            <span className="form-signup-error">{error.regexPassword}</span>
            }
            <input className="form-input-submit" type="submit" value="S'enregistrer" />  
            {error && 
            <span className="form-signup-error">{error.message}</span>}
            {/* {isLoading && <p>En cours de chargement...</p>}  */}
        </form>
        )}
        </>
    )
};

export default SignUpForm;