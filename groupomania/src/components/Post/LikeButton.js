import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";


const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn

    const like = () => {
        console.log("je suis dans le fecth like")
        // const url = `http://localhost:4000/api/posts/${post._id}/like`;
        // const fetchLike = async () => {
        //     try{
        //     const response = await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json",
        //             "Authorization": `Bearer ${localStorage.getItem("token")}`
        //         },
        //         data: {
        //             likes : liked,
        //             // userLiked: [post.userId, ...post.userLiked]
        //         }
        //     })
        //     const responseData = await response.json();
        //         if(response.ok) {
        //         console.log("response data ok", responseData)
        //         } else {
        //         console.log("Pas ok", responseData.error);  
        //         }
        //     } catch(error) {
        //             console.log("Error Liked", error)
        //     };
        // }   
        // fetchLike(setLiked(true)); 
    };

    const unlike = () => {
        console.log("je suis dans le fecth unlike")
        // const url = `http://localhost:4000/api/posts/${post._id}/like`;
        // const fetchUnlike = async () => {
        //     try{
        //     const response = await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json",
        //             "Authorization": `Bearer ${localStorage.getItem("token")}`
        //         },
        //         data: {
        //             likes : liked
        //         }
        //     })
        //     const responseData = await response.json();
        //         if(response.ok) {
        //         console.log("response data ok", responseData)
        //         } else {
        //         console.log("Pas ok", responseData.error);  
        //         }
        //     } catch(error) {
        //             console.log("Error Liked", error)
        //     };
        // }   
        // fetchUnlike();
    }

    // useEffect(() => {
    //     setLiked(true)
    // }, [isLoggedIn, liked, post])
    // console.log("coeur", liked)

    return(
        <div className="like-container">
            {isLoggedIn && liked && (
                <ContainerLike>
                    <StyledEmptyLikeBtn className="fa-regular fa-heart" onClick={like} alt="Bouton like"></StyledEmptyLikeBtn>
                </ContainerLike>
            )}
            {isLoggedIn && liked && (
                <StyledFilledLikeBtn className="fa-solid fa-heart" onClick={unlike} alt="Bouton like"></StyledFilledLikeBtn>
            )}
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