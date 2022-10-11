import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../context/UserContext";

export default function NewPost () {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn
    console.log("home", authId);

    if(!isLoggedIn) {
        return <Navigate to='/' />
    }

    return(
        <div>
            nouveau post
        </div>
    )
}


