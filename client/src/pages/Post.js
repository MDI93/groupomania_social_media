import React from "react";
import Logo from '../assets/Logos/icon-left-font-monochrome-black.svg'
import styled from "styled-components";

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

function NewPost() {
    return(
        <div>
            <StyledHeader>
                <StyledLogo src={Logo} alt="Logo de l'entreprise Groupomania" />
            </StyledHeader> 
        </div>
    )
}
export default NewPost