import React, { useContext } from 'react';
import Logo from '../assets/Logos/icon-left-font-monochrome-black.svg'
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { AuthUserContext } from '../context/UserContext';

const Navbar = () => {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;

    return(
        <StyledNav className='navbar-container'>
            <NavLink exact="true" to={'/home'}>
                <StyledLogo src={Logo} alt="Logo de l'entreprise Groupomania" />
            </NavLink>
            {isLoggedIn && 
            <Ul className='navbar-list-links'>
                <Li>
                    <NavLinkStyled exact="true" to={'/home'}>
                        <h3>Accueil</h3>
                    </NavLinkStyled>
                </Li>
                <Li>
                    <NavLinkStyled exact="true" to={'/newpost'}>
                        <h3>Créer un article</h3>
                    </NavLinkStyled>
                </Li>
            </Ul>
            }
            <NavLinkStyled exact="true" to='/'>
                <Logout />
            </NavLinkStyled>
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
const Ul = styled.ul`
    list-style-type: none;
    align-items: center;
    justify-content: center;
    height: 30px;
    display: flex;
`
const Li = styled.li`
    display: flex;
    margin-left: 20px;
    :hover {
        color: #FFD7D7;
        transform: scale(1.1)
    }
`
const NavLinkStyled = styled(NavLink)`
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