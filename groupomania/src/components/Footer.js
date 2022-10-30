import React from 'react'
import WhiteLogo from '../assets/Logos/logo_monochrome_white.svg'

const Footer = () => {
  return (
    <div className='footer-container'>
        <img className="footer-logo" src={WhiteLogo} alt="Logo de l'entreprise Groupomania" />
        <h5>Réseau social d'entreprise</h5>
    </div>
  )
}

export default Footer;

