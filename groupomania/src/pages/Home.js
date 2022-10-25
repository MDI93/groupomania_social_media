import React, { useContext, useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../context/UserContext";
import Thread from "../components/Thread";
import styled from "styled-components";
import Card from "../components/Post/Card";

export default function Home() {
    const authId = useContext(AuthUserContext);

    // console.log("*************************authId***************************", authId);

    const isLoggedIn = authId.isLoggedIn;
    const [data, setData] = useState([]);
    const posts = data.data;

    const url = "http://localhost:4000/api/posts/";

    const fetchData = useCallback(async() => {
      try{
        const response = await fetch(url, {
          method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        const responseData = await response.json();
          if(response.ok){
            setData({
              data: responseData
            }) 
            console.log("++++++", responseData)
          } else {
            throw new Error(responseData.error);
          }
      } catch(error) {
        console.log("error", error);
      }},[url]);   
        
    useEffect(() => { 
      if(isLoggedIn){
        fetchData()
      };
    }, [isLoggedIn, fetchData])

    const refresh =() => {
      console.log("---> Refresh")
      fetchData();
    }

    return( 
        <>
          {!isLoggedIn && <Navigate to='/' replace="true"/>}
          {isLoggedIn && (
              <div className="Cards-container">
                <StyledUl className="card-list-posts">
                {posts &&
                    posts.map((post) => {
                        return <Card 
                            post={post} 
                            refresh={refresh} 
                            key={post._id}
                            />
                    })}
              </StyledUl>
          </div>
          )}
        </>
    )
}
const StyledUl = styled.ul`
       list-style-type: none;
`
/* <Thread data={data} refresh={refresh} /> */