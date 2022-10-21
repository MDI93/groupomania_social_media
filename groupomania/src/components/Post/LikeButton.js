import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";


const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn

    const like = () => {}

    const unlike = () => {}

    useEffect(() => {
        if(post.userLiked) 
            setLiked(true)
    }, [isLoggedIn, liked, post.userLiked])
    console.log(liked)
    return(
        <div className="like-container">
            {isLoggedIn && liked === false && (
                <StyledEmptyLikeBtn className="fa-regular fa-heart" onClick={like} alt="Bouton like"></StyledEmptyLikeBtn>
            )}
            {isLoggedIn && liked && (
                <StyledFilledLikeBtn className="fa-solid fa-heart" onClick={unlike} alt="Bouton unlike"></StyledFilledLikeBtn>
            )}
        </div>
    )
};

export default LikeButton;

const StyledEmptyLikeBtn = styled.i`
    font-size: 25px;
    margin-left: 10px;
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