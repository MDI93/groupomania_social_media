import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const IndexLog = () => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [loginModal, setLoginModal] = useState(true);

    const handleModals = (e) => {
        if(e.target.id === 'signUp'){
            setLoginModal(false);
            setSignUpModal(true);
        } else if(e.target.id === 'login'){
            setLoginModal(true);
            setSignUpModal(false);
        }
    }

    return(
        <div className="connection-form">
            <div className="form-container">
                <StyledNav>
                    <StyledLink onClick={handleModals} id="signUp">S'enregistrer</StyledLink>
                    <StyledLink onClick={handleModals} id="login">Se connecter</StyledLink>
                </StyledNav>
                <CardLog>
                    {signUpModal && <SignUpForm />}
                    {loginModal && <LoginForm />}
                </CardLog>
            </div>
        </div>
    )
}

const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
`

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    margin: 5px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    width: 150px;
    background-color: #5555;
    border-radius: 20px 20px;
    box-shadow: 2px 2px 10px grey;
    :hover {
        color: #FFD7D7;
        transform: scale(1.1)
    }
`

const CardLog = styled.span`
    display: flex;
    justify-content: center;
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    height: 300px;
`

export default IndexLog;
