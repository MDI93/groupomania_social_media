import React, { useState } from "react";
import styled from 'styled-components';
import Axios from "axios";

// Constante pour envoyer le formulaire 'Se connecter' vers l'API
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        console.log(email)
        event.preventDefault();
        const emailError = document.querySelector('errorEmail');
        const passwordError = document.querySelector('errorPassword');

       Axios({
            method: "post",
            url: `http://localhost:5000/api/auth/login`,
            data: {
                email,
                password
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.error) {
                emailError.innerHTML = res.data.error;
                passwordError.innerHTML = res.data.error;
            } else {
                //stocker le token
                window.location = '/home';
            }
        })
        .catch((error) => console.log(error))
    }

    return(
        <StyledForm onSubmit={handleLogin}>
            <label htmlFor="login">Déjà inscrit</label>
            <br />
            <StyledInput 
                type="text" 
                name="email" 
                placeholder="  Adresse e-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <StyledError className="errorEmail"></StyledError>
            <br />
            <StyledInput
                type="password" 
                name="password" 
                placeholder="  Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <StyledError className="errorPassword"></StyledError>
            <br />
            <StyledBtn type="submit" value="Se connecter" />
            <div><span></span></div>
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
    font-size: 12px;
`

export default LoginForm;

// const handleSubmit = (props) => {
    //     fetch(`http://localhost:3000/api/auth/login`,{
    //         method: "POST",
    //         headers:{
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "email": email,
    //             "password": password
    //         })
    //     })
    //         .then((response) => response.json()
    //         .then((response) => window.location = '/home')
    //         .catch((error) => console.log(error))
    // )}

    // useEffect(() => {
    //     fetch(`http://localhost:3001/api/auth/login`,{
    //         method: 'POST',
    //         body: JSON.stringify(data)
    //     })
    //     .then((response) => response.json())
    //     .then(({ email }) => {
    //     setEmail(email)
    //     })
    // }, [])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Envoyé')
    // }