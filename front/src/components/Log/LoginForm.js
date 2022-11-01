import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context/UserContext";

// Constante pour envoyer le formulaire 'Se connecter' vers l'API
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();
    const [errorEmailPassword, setErrorEmailPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const authId = useContext(AuthUserContext);
    const navigate = useNavigate();
    
    const handleLogin = (event) => {
        event.preventDefault();
    
    setIsLoading(true)    

// Requête pour se connecter
    const url = "http://localhost:4000/api/auth/login"
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
                authId.login(responseData);
                navigate('/home', {replace: true})
            } else {
                setErrorEmailPassword(responseData.error);  
            }  
        } catch(error) {
            console.log(error)
        }
    }
    fetchPost();
}
    return(
        <form onSubmit={handleLogin} className='form-login-container'>
            <label htmlFor="login" className="form-label">Déjà enregistrer</label>
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input 
                className="form-input"    
                type="text" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label htmlFor="email" className="form-label">Mot de passe</label>
            <input
                className="form-input"
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <input className="form-input-submit" type="submit" value="Se connecter" />
            {errorEmailPassword && 
            <span className="form-error">Adresse e-mail et/ou mot de passe incorrect(s)</span>}
            {isLoading && <p className="loading">En cours de chargement...</p>}
        </form>
    )
};

export default LoginForm;