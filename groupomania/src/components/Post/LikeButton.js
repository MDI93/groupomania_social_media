import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";


const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState();
    const [usersLiked, setUsersLiked] = useState();
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn

    // setLiked(post.usersLiked.include(authId.userId))
    
    const like = () => {
        console.log("je suis dans le fecth like")
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
                console.log("response data ok", responseData)
                } else {
                console.log("Pas ok", responseData.error);  
                }
            } catch(error) {
                    console.log("Error Liked", error)
            };
        }   
        fetchLike(setLiked(true)); 
    };

    useEffect(() => {
        setLiked(true)
    }, [isLoggedIn, liked, post])
    console.log("coeur", liked)

    return(
        <div className="like-container">
            { isLoggedIn && (
                <StyledEmptyLikeBtn 
                    className="fa-solid fa-heart" 
                    onClick={like} alt="Bouton like">
                    <span>{post.likes}</span>
                </StyledEmptyLikeBtn>
                )}
            {/* ) : (
                <StyledFilledLikeBtn 
                    className="fa-solid fa-heart" 
                    onClick={like} alt="Bouton like">
                    <span>{post.likes}</span>
                </StyledFilledLikeBtn>
            )} */}
        </div>
    )
};

export default LikeButton;

const ContainerLike = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledEmptyLikeBtn = styled.i`
    font-size: 25px;
    margin-left: 10px;
    margin-right: 10px;
    &:hover {
        color: #FD2D01;
        cursor: pointer;
        transform: scale(1.08);
    } 
`
const StyledFilledLikeBtn = styled.i`
    font-size: 25px;
    &:hover {
        color: #FD2D01;
        cursor: pointer;
        transform: scale(1.08);
    } 
`