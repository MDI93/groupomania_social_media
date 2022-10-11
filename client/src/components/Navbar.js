import React from 'react';
import Logo from '../assets/Logos/icon-left-font-monochrome-black.svg'
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

const Navbar = () => {
    return(
        <StyledNav>
            <NavLink exact to='/home'>
                <StyledLogo src={Logo} alt="Logo de l'entreprise Groupomania" />
            </NavLink>
            <StyledUl>
                <StyledLi>
                    <StyledNavLink exact to='/home'>
                        <h3>Accueil</h3>
                    </StyledNavLink>
                </StyledLi>
                <StyledLi>
                    <StyledNavLink exact to='/newpost'>
                        <h3>Créer un post</h3>
                    </StyledNavLink>
                </StyledLi>
            </StyledUl>
                <StyledNavLink exact to='/'>
                    <h3>Se déconnecter</h3>
                </StyledNavLink>
        </StyledNav>
    )
}  

const StyledNav = styled.span`
    text-decoration: none;
    display: flex;
    justify-content: left;
    justify-content: space-between;
    border-bottom: 3px solid #FD2D01;
    margin-bottom: 100px;
`
const StyledUl = styled.ul`
    list-style-type: none;
    align-items: center;
    justify-content: center;
    height: 30px;
    display: flex;
`
const StyledLi = styled.li`
    display: flex;
    margin-left: 20px;
    :hover {
        color: #FFD7D7;
        transform: scale(1.1)
    }
`
const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    flex-direction: center;
    color: #8186a0;
    :hover {
        color: #FFD7D7;
        transform: scale(1.1)
    }
`
const StyledLogo = styled.img`
    display: flex;
    align-items: center;
    height: 30px;
    padding: 15px;
    display: flex; 
`

export default Navbar;