import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoginForm from "./LoginForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);

    const handleSignUp = (event) => {
        event.preventDefault();
        
       axios({
            method: "post",
            url: `http://localhost:4000/api/auth/signup`,
            data: {
                email,
                password
            }
        })
        .then((res) => {
            console.log(res)
            if(res.error) {
                setErrorEmail(res.error)
            } else {
                setFormSubmit(true);
            }
        })
        .catch((error) => console.log(error))
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
            <Label htmlFor="email">Mot de passe</Label>
            <Input 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Btn type="submit" value="S'enregistrer" />  
            {errorEmail && 
            <Error>Adresse e-mail et/ou mot de passe incorrect(s)</Error>}
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


export default SignUpForm;