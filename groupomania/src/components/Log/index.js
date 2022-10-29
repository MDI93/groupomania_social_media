import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";


const IndexLog = () => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [loginModal, setLoginModal] = useState(true);

// Change l'état de la modal d'authenfication
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
            <div className="form-container">
                <nav className="form-nav">
                    <Link onClick={handleModals} className="form-link" id="signUp">S'enregistrer</Link>
                    <Link onClick={handleModals} className="form-link" id="login">Se connecter</Link>
                </nav>
                <span className="form-modal">
                    {signUpModal && <SignUpForm />}
                    {loginModal && <LoginForm />}
                </span>
            </div>
    )
};

export default IndexLog;
