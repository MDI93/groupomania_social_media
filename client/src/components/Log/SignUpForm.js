import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoginForm from "./LoginForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    // const [error, setError] = useState(false);
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
        <StyledForm action="" onSubmit={handleSignUp} id="signup-form">
            <label htmlFor="email">Créer un nouveau compte</label>
            <br />
            <label htmlFor="email">Adresse e-mail</label>
            <StyledInput 
                type="text" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <label htmlFor="email">Mot de passe</label>
            <StyledInput 
                type="password" 
                name="password" 
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />
            <StyledBtn type="submit" value="S'enregistrer" />  
            {errorEmail && 
            <StyledError>Adresse e-mail et/ou mot de passe incorrect(s)</StyledError>}
        </StyledForm>
        )}
        </>
    )
}

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


export default SignUpForm;