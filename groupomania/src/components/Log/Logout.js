import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../context/UserContext";

const Logout = () => {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;
    return(
        <>
        {isLoggedIn &&
                <Link onClick={authId.logout}>
                    <div className="logout-icon-container">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>   
                </Link>
            }
        </>
    )
}


export default Logout