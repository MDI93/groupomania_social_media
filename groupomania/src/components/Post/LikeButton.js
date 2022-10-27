import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState();
    const [isActive, setActive] = useState("emptyHeart")
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;

    // setLiked(post.usersLiked.include(authId.userId))
    const handleLike = () => {
        setActive((isActive) => !isActive)
        setLiked("fullHeart")
        console.log("active", isActive)
    }

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
        console.log("use effect setliked")
    }, [isLoggedIn, isActive, liked, post])
    console.log("coeur", liked)

    return(
        <ContainerLike className="like-container">
            { isLoggedIn ? (
                <div>
                    <StyledEmptyLikeBtn 
                        className="emptyHeart"
                        onClick={like} 
                        alt="Bouton like">
                    { isActive ? <i class="fa-regular fa-heart"></i> : <i  class="fa-solid fa-heart"></i> }
                    </StyledEmptyLikeBtn>
                    { !isActive ? <span>{post.likes + 1}</span> : <span>{post.likes}</span> }
                </div>
            ) : (
                <div>
                    <StyledFilledLikeBtn 
                        className="fullHeart"
                        onClick={like} 
                        alt="Bouton like">
                    { isActive ? <i  class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                    </StyledFilledLikeBtn>
                    { !isActive ? <span>{post.likes - 1}</span> : <span>{post.likes}</span> }
                </div>
            )}
        </ContainerLike>
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
    color: #FD2D01;
    &:hover {
        cursor: pointer;
        transform: scale(1.08);
    } 
`
const StyledFilledLikeBtn = styled.i`
    font-size: 25px;
    color: #FD2D01;
`
const StyledUsersLiked = styled.span`
    font-size: 25px;
    margin-left: 10px;
    margin-right: 10px;
`