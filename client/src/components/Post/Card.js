import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState(post);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        postData && 
        setIsLoading(false);
    }, [postData])


    const updateHandler = () => {
        console.log("Modif")
        setUpdatePost((updatePost) => !updatePost)
        console.log("update", updatePost)
    }
     console.log("postData", postData)

    const firstNameInputRef = useRef();

    const changeHandler = () => {
        const changeFirstName = firstNameInputRef.current.value;
        console.log("modif input", changeFirstName)

        setPostData({
            ...post,
            "firstName": changeFirstName,
        })
    }

    const deleteHandler = () => {

    }
   
    return(
        <li className="card-container" key={post._id}>
        {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
        ) : (
            <StyledCardContainer className="card-container">
              <StyledCard className="card">
                <StyledHeader className="card-header">
                { !updatePost && <StyledName className="firstName">{post.firstName}</StyledName>}
                { updatePost && <input type="text" value={postData.firstName} onChange={changeHandler} ref={firstNameInputRef}></input>}

                { !updatePost && <StyledName className="Lastname">{post.lastName}</StyledName>}
                { updatePost && <input type="text" value={post.lastName} onChange={()=>{}}></input>}
                    <p className="card-timestamps">{post.createdAt}</p>
                </StyledHeader>
                <div className="card-middle">
                    <div className="card-img">
                    { !updatePost &&<StyledImgCard className="img" src={post.image} alt="Image choisit par l'utilisateur" />}
                    { updatePost && <input type="text" value={post.image} onChange={()=>{}}></input>}
                    </div>
                    <div className="card-comment">
                        { !updatePost &&  <p>{post.message}</p>}
                        { updatePost && <input type="text" value={post.message} onChange={()=>{}}></input>}
                    </div>
                </div>
                <LikeButton />
                <StyledBtnDiv className="card-btn-container">
                    <StyledBtnCard onClick={updateHandler} className="card-btn-update" alt="Bouton pour modifier le post">
                        { !updatePost ? "Modifier" : "Envoyer" }
                    </StyledBtnCard>
                    <StyledBtnCard onClik={deleteHandler} className="card-btn-delete" alt="Bouton pour supprimer le post">Supprimer</StyledBtnCard>
                </StyledBtnDiv>
                </StyledCard>
            </StyledCardContainer>
        )}
        </li> 
    )
};

export default Card;

const StyledCardContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;  
    text-align: center;
    padding: 20px;
`

const StyledCard = styled.div`
    padding: 15px;
    border: 2px solid none;
    box-shadow: 2px 2px 10px #FFD7D7;
    border-radius: 20px 20px;
    width: 60%;
`
const StyledHeader = styled.header`
    display: flex;
`
const StyledName = styled.h3`
    margin: 5px;
`
const StyledImgCard = styled.img`
    box-shadow: 5px 10px 10px #4E5166;
    border-radius: 20px;
    max-width: 80%;
    width: auto;
    max-height: 400px;
`
// const StyledIconLike = styled.i`
//     border: black;
//     margin: 10px;
//     &:hover {
//         color: #FFD7D7;
//         cursor: pointer;
//   	    transform: scale(1.08);
//     } 
// `
const StyledBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px;
`
const StyledBtnCard = styled.button`
    color: #8186a0;
    font-size: 18px;
    border-radius: 10px 10px;
    margin: 5px;
    height: 30px;
    width: 30%;
    &:hover {
        background-color: #FFD7D7;
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`




    

   

