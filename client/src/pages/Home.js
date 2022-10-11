import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Thread from "../components/Thread";
import { AuthUserContext } from "../context/UserContext";

export default function Home() {
    const authId = useContext(AuthUserContext)
    const isLoggedIn = authId.isLoggedIn
    console.log("home", isLoggedIn);

    if(!isLoggedIn) {
        return <Navigate to='/' />
    }

    return( 
        <div className="home">
            <Thread />
        </div>
    )
}


