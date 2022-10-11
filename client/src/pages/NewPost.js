import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../context/UserContext";

export default function NewPost () {
    const { authId } = useContext(AuthUserContext);
    console.log("home", authId);

    if(!authId) {
        return <Navigate to='/' />
    }

    return(
        <div>
            nouveau post
        </div>
    )
}


