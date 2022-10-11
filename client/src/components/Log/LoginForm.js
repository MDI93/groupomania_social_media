import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthUserContext } from "../../context/UserContext";
// import { Navigate } from "react-router-dom";

// Constante pour envoyer le formulaire 'Se connecter' vers l'API
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();
    const [errorEmailPassword, setErrorEmailPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const authId = useContext(AuthUserContext);
    const navigate = useNavigate();
    
    console.log("token",authId)
    const handleLogin = (event) => {
        event.preventDefault();
    
    setIsLoading(true)    
    
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
                // navigate('/home')
                console.log(data)
            } else {
                setErrorEmailPassword(responseData.error);  
            }  
        } catch(error) {
            console.log(error)
        }
    }
    fetchPost();
}

    const errorHandler = () => {
        setErrorEmailPassword(null)
    }

    return(
        <StyledForm onSubmit={handleLogin}>
            <label htmlFor="login">Déjà enregistrer</label>
            <br />
            <label htmlFor="email">Adresse e-mail</label>
            <StyledInput 
                type="text" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />    
            <br />
            <label htmlFor="email">Mot de passe</label>
            <StyledInput
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />
            <StyledBtn type="submit" value="Se connecter" />
            {errorEmailPassword && 
            <StyledError>Adresse e-mail et/ou mot de passe incorrect(s)</StyledError>}
            {isLoading && <p>En cours de chargement...</p>}
        </StyledForm>
    )
}

// Style de la page 'Login'
const StyledForm = styled.form`
    background-color: #4E5166;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8186a0;
    font-size: 18px;
    width: 400px;
    border-radius: 20px 20px;
    box-shadow: 2px 2px 10px grey;
`
const StyledInput = styled.input`
    width: 60%;
    border-radius: 15px 15px;
    height: 30px;
`
const StyledBtn = styled.input`
    color: #8186a0;
    font-size: 18px;
    border-radius: 15px 15px;
    height: 40px;
    width: 40%;
    &:hover {
        background-color: #FFD7D7;
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`
const StyledError = styled.span`
    color: red;
    padding-bottom:5px;
    font-size: 14px;
`

export default LoginForm;