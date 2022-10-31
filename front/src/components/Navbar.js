import React, { useContext } from 'react';
import Logo from '../assets/Logos/icon-left-font-monochrome-black.svg'
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { AuthUserContext } from '../context/UserContext';

const Navbar = () => {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;

    return(
        <div className="navbar-container">
            <NavLink className="navbar-logo-container" exact="true" to={'/home'}>
                <img className="navbar-logo" src={Logo} alt="Logo de l'entreprise Groupomania" />
            </NavLink>
            {isLoggedIn && 
            <ul className="navbar-list-links">
                <li className="navbar-link">
                    <NavLink className="navbar-NavLink" exact="true" to={'/home'}>
                        <h3>Accueil</h3>
                    </NavLink>
                </li>
                <li className="navbar-link">
                    <NavLink className="navbar-NavLink" exact="true" to={'/newpost'}>
                        <h3>Créer un article</h3>
                    </NavLink>
                </li>
            </ul>
            }
            <div className="navbar-logout">
                <Logout exact="true" to='/' />
            </div>
        </div>
    )
}  


export default Navbar;