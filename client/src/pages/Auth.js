import React, { useContext } from "react";
import IndexLog from '../components/Log';
import Logo from '../assets/Logos/icon-left-font-monochrome-black.svg'
import styled from "styled-components";
import { AuthContext } from "../components/AuthContext";
import Home from "./Home";

const Auth = () => {
    const authed = useContext(AuthContext);

    return(
        <div className="auth-page">
            {authed ? (
                <Home />
            ):(
                <div className="log-container">
                <StyledHeader>
                    <StyledLogo src={Logo} alt="Logo de l'entreprise Groupomania" />
                </StyledHeader>  
                <IndexLog />
            </div>
            )}
            
        </div>
    )
}

const StyledHeader = styled.span`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
`

const StyledLogo = styled.img`
    height: 30px;
    padding: 15px;
    display: flex;
`

export default Auth;