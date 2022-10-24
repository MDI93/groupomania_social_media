import React, { useContext, useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../context/UserContext";
import Thread from "../components/Thread";

export default function Home() {
    const authId = useContext(AuthUserContext);

    // console.log("*************************authId***************************", authId);

    const isLoggedIn = authId.isLoggedIn;
    const [data, setData] = useState([]);

    const url = `${process.env.REACT_APP_URL_API}/posts/`;

    const fetchData = useCallback(async() => {
      try{
        const response = await fetch(url, {
          method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${authId.auth}`
            }
        });
        const responseData = await response.json();
          if(response.ok){
            setData({
              data: responseData
            }) 
          } else {
            throw new Error(responseData.error);
          }
      } catch(error) {
        console.log("error", error);
      }},[authId.auth, url]);   
        
    useEffect(() => { 
      if(isLoggedIn){
        fetchData()
      };
    }, [isLoggedIn, fetchData])

    // const onRefresh = () =>{
    //   console.log("reload")
    //   fetchData();
    // }

    return( 
        <>
          {!isLoggedIn && <Navigate to='/' replace="true"/>}
          {isLoggedIn && (
            <Thread 
              data={data} 
              // onRefresh={onRefresh} 
            />
          )}
        </>
    )
}