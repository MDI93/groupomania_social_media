import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../context/UserContext";
import FormNewPost from '../components/Post/FormNewPost'

export default function NewPost () {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn

    if(!isLoggedIn) {
        return <Navigate to='/' />
    }

    return(
       <>
            <FormNewPost />
       </>
    )
}


