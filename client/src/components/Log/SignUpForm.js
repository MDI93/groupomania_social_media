import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import LoginForm from "./LoginForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (event) => {
        event.preventDefault();
        const emailError = document.querySelector('errorEmail');
        const passwordError = document.querySelector('errorPassword')
        
       Axios({
            method: "post",
            url: `http://localhost:5000/api/auth/signup`,
            data: {
                email,
                password
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.errors) {
                emailError.innerHTML = res.data.error.email;
                passwordError.innerHTML = res.data.error.password;
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
                <StyledSuccess className="success">Bravo, vous êtes inscrit, veuillez-vous connecter</StyledSuccess>
            </>    
            ) : (
        <StyledForm action="" onSubmit={handleSignUp} id="signup-form">
            <label htmlFor="email">Créer un nouveau compte</label>
            <br />
            <StyledInput 
                type="text" 
                name="email" 
                placeholder="  Adresse e-mail"
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="email-error"></div>
            <br />
            <StyledInput 
                type="password" 
                name="password" 
                placeholder="  Mot de passe"
                id="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password-error"></div>
            <br />
            <StyledBtn type="submit" value="S'inscrire" />  
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
const StyledSuccess = styled.span`
    color: green;
`


export default SignUpForm;