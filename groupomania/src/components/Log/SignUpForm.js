import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();  
        
    setIsLoading(true);
        
    if(email.trim().length === 0 || password.trim().length === 0){
        setError({
            message: "Entrer votre adresse e-mail et/ou votre mot de passe."
        })
        return;
    };

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
                console.log("response data", responseData)
            } else {
                setError(responseData.error);  
                console.log("error else",responseData.error)
            } 
            if(responseData && responseData.error){
                console.log("dans le if")
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
        <Form action="" onSubmit={handleSignUp} id="signup-form">
            <Label htmlFor="email">Créer un nouveau compte</Label>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {error && 
            <Error>{error.regexEmail}</Error> }
            {error && 
            <Error>{error.takenEmail}</Error> }
            <Label htmlFor="email">Mot de passe</Label>
            <Input 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {error && 
            <Error>{error.regexPassword}</Error>
            }
            <Btn type="submit" value="S'enregistrer" />  
            {error && 
            <Error>{error.message}</Error>}
            {/* {isLoading && <p>En cours de chargement...</p>}  */}
        </Form>
        )}
        </>
    )
}

const Form = styled.form`
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
const Label = styled.label`
    margin: 10px;
`
const Input = styled.input`
    width: 60%;
    border-radius: 15px 15px;
    min-height: 30px;
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
    margin-right: 10px;
    margin-left: 10px;
    color: red;
    padding-bottom:5px;
    font-size: 14px;
    left: 50%;
    right: 50%; 
`


export default SignUpForm;