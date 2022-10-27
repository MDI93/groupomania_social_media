import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
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
        <Form onSubmit={handleLogin}>
            <Label htmlFor="login">Déjà enregistrer</Label>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input 
                type="text" 
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />    
            <Label htmlFor="email">Mot de passe</Label>
            <Input
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Btn type="submit" value="Se connecter" />
            {errorEmailPassword && 
            <Error>Adresse e-mail et/ou mot de passe incorrect(s)</Error>}
            {isLoading && <p>En cours de chargement...</p>}
        </Form>
    )
}

// Style de la page 'Login'
const Form = styled.form`
    background-color: #4E5166;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8186a0;
    font-size: 18px;
    width: 400px;
    padding: 10px;
    border-radius: 20px 20px;
    box-shadow: 2px 2px 10px grey;
`
const Label = styled.label`
    margin: 10px;
`
const Input = styled.input`
    width: 60%;
    border-radius: 15px 15px;
    height: 30px;
    margin: 5px;
`
const Btn = styled.input`
    color: #8186a0;
    font-size: 18px;
    border-radius: 15px 15px;
    height: 40px;
    width: 40%;
    margin: 15px;
    &:hover {
        background-color: #FFD7D7;
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`
const Error = styled.span`
    color: red;
    padding-bottom:5px;
    font-size: 14px;
`

export default LoginForm;