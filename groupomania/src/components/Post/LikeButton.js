import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState();
    const [isActive, setActive] = useState("emptyHeart")
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;

// Gère le changement d'état du like
    const handleLike = () => {
        setActive((isActive) => !isActive)
        setLiked("fullHeart")
    }

// Envoie une requete POST à l'API
    const like = () => {
        const url = `http://localhost:4000/api/posts/${post._id}/like`;
        const fetchLike = async () => {
            try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const responseData = await response.json();
                if(response.ok) {
                return post && post.likes
                } else {
                console.log("Pas ok", responseData.error);  
                }
            } catch(error) {
                console.log("Error Liked", error)
            };
        }   
        fetchLike(); 
        handleLike();
    };


    useEffect(() => {
        setLiked("fullHeart")
    }, [isLoggedIn, isActive, liked, post]);

    return(
        <>
            { !post.usersLiked.includes(authId.userId) ? (
                <ContainerLike className="like-container">
                    <StyledEmptyLikeBtn 
                        className="emptyHeart"
                        onClick={like} 
                        alt="Bouton like">
                    { isActive ? <i className="fa-regular fa-heart"></i> : <i  className="fa-solid fa-heart"></i> }
                    </StyledEmptyLikeBtn>
                    { !isActive ? <UsersLiked>{post.likes + 1}</UsersLiked> : <UsersLiked>{post.likes}</UsersLiked> }
                </ContainerLike>
            ) : (
                <ContainerLike className="like-container">
                    <StyledFilledLikeBtn 
                        className="fullHeart"
                        onClick={like} 
                        alt="Bouton like">
                    { isActive ? <i  className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                    </StyledFilledLikeBtn>
                    { !isActive ? <UsersLiked>{post.likes - 1}</UsersLiked> : <UsersLiked>{post.likes}</UsersLiked> }
                </ContainerLike>
            )}
        </>
    )
};

export default LikeButton;

const ContainerLike = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 20%;
    @media screen and (min-width: 320px) and (max-width: 600px){
        width: 21%;
    }
`

const StyledEmptyLikeBtn = styled.i`
    font-size: 22px;
    margin-left: 10px;
    color: #FD2D01;
    border-radius: 20px;
    box-shadow: 2px 2px 10px red;
    &:hover {
        cursor: pointer;
        transform: scale(1.08);
    } 
    @media screen and (min-width: 320px) and (max-width: 600px){
        font-size: 17px;
        margin-left: 10px;
        padding: 5px;
    }
`
const StyledFilledLikeBtn = styled.i`
    font-size: 22px;
    color: #FD2D01;
    margin-left: 10px;
    box-shadow: 2px 2px 10px red;
    border-radius: 20px;
    padding: 5px;   
    @media screen and (min-width: 320px) and (max-width: 600px){
        font-size: 17px;
        margin-left: 10px;
    }
`
const UsersLiked = styled.span`
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    margin-left: 20px
    @media screen and (min-width: 320px) and (max-width: 600px){
        font-size: 16px;
        margin-left: 15px
    }
`