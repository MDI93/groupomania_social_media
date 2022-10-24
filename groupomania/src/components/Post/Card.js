import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import styled from "styled-components";
import { AuthUserContext } from "../../context/UserContext";
import { dateParser } from "../Routes/utils";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const Card = ({ post, onRefresh }) => {
    const authId = useContext(AuthUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState(post);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        postData && 
        setIsLoading(false);
    }, [postData])

    const updateHandler = useCallback(() => {
        console.log("Modif")
        setUpdatePost((updatePost) => !updatePost)
        console.log("update", updatePost)
    }, [updatePost]);

     console.log("postData", postData)

    const messageUpdateRef = useRef();

    const modifyHandler = useCallback((e) => {
        const updatedMessage = messageUpdateRef.current.value;
        console.log("modif textarea", updatedMessage)

        let newImage;
        if(e.target.files && e.target.files[0]){
            newImage = e.target.files[0]
            console.log("------Event", e.target.files[0])
        }
        console.log("------newImage", newImage)
       
        setPostData(prevState => ({
            ...prevState.postData,
            "message": updatedMessage,
            "image": newImage
        }));

        const updateStateFormData = {
            "message": updatedMessage
        }
    
        const formData = new FormData();

        formData.append("image", newImage);
        formData.append("post", JSON.stringify(updateStateFormData));

        console.log(formData.get('image'))
        console.log(formData.get('post'))

        const url = `${process.env.REACT_APP_URL_API}/posts/${post._id}`
        const uploadHandler = async () => {
            try{
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        // "Accept": "*/*",
                        // "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData
                })
                const responseData = await response.json();
                    if(response.ok) {
                    console.log("response data ok", responseData)
                    alert("Votre article a bien été modifié ! ;)")
                    } else {
                    console.log("Pas ok", responseData.error);  
                    }
                } catch(error) {
                    console.log("Error upload", error)
                };
        }
        uploadHandler()
    }, [post._id]);

    // useEffect(() => {
    //     if(updatePost){
    //        onRefresh(); 
    //     }
    // }, [updatePost])    
   
    return(
        <li className="card-container" key={post._id}>
        {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
        ) : (
            <StyledCardContainer className="card-container">
              <StyledCard className="card">
                <StyledHeader className="card-header">
                <StyledHeaderName>
                    <StyledName className="firstName" id="firstName">{postData.firstName}</StyledName>
                    <StyledName className="Lastname">{postData.lastName}</StyledName>
                </StyledHeaderName>
                <StyledSpanTimeStamp>{dateParser(post.createdAt)}</StyledSpanTimeStamp>
                </StyledHeader>
                <div className="card-middle">
                    <div className="card-img">
                        <StyledImgCard className="img" src={postData.image} alt={postData ? null : "Image choisit par l'utilisateur"} />
                    { updatePost ? 
                        (
                        <input  
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={modifyHandler}
                            accept=".jpg, .jpeg, .png"
                        />
                        ) : ( null )}
                    </div>
                    <div className="card-message">
                        { updatePost === false &&  <p>{postData.message}</p>}
                        { updatePost && 
                        <div className="update-post">
                            <StyledTextArea 
                                className="post-message"
                                defaultValue={postData.message} 
                                onChange={modifyHandler}
                                ref={messageUpdateRef}
                                />
                        </div>
                        }
                    </div>
                </div>
                <StyledBtnDiv className="card-btn-container">
                    <LikeButton post={post} key={post._id}/>
                    { authId.userId === post.userId ? (
                        <StyledBtnUpdateDelete>
                            <StyledBtnCard 
                                type='submit'
                                onClick={updateHandler} 
                                className="card-btn-update" 
                                alt="Bouton pour modifier l'article">
                            { !updatePost ? <i class="fa-regular fa-pen-to-square"></i> : "Valider"}
                            </StyledBtnCard>
                            <DeleteButton post={post} id={post._id} />
                        </StyledBtnUpdateDelete>
                    ) : null}
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
    background: linear-gradient(white, #FFD7D7);
    box-shadow: 2px 2px 10px #FFD7D7;
    border-radius: 20px 20px;
    width: 60%;
`
const StyledHeaderName = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
const StyledName = styled.h3`
    margin: 5px;
`
const StyledImgCard = styled.img`
    box-shadow: 5px 10px 10px #4E5166;
    border-radius: 20px;
    max-width: 80%;
    width: auto;
    max-height: 350px;
`
const StyledBtnUpdateDelete = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledBtnDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledBtnCard = styled.button`
    color: #8186a0;
    font-size: 16px;
    border-radius: 40px;
    height: 30px;
    &:hover {
        color: white;
        background-color: orange;
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`
const StyledTextArea = styled.textarea`
    border-radius: 10px 10px;
    min-height: 60px;
    width: 80%;
`
const StyledSpanTimeStamp = styled.span`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-style: italic;
`




    

   

