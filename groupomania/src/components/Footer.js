import React from 'react'
import styled from 'styled-components';
import WhiteLogo from '../assets/Logos/logo_monochrome_white.svg'

const Footer = () => {
  return (
    <StyledFooter>
        <StyledLogo src={WhiteLogo} alt="Logo de l'entreprise Groupomania" />
        <StyledH5>Réseau social d'entreprise</StyledH5>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 80px;
    border-radius: 10px 10px;
    background: linear-gradient(#FD2D01, white);
    height: 40px;
`
const StyledLogo = styled.img`
    display: flex;
    align-items: center;
    height: 20px;
`
const StyledH5 = styled.h5`
    color: white;
`