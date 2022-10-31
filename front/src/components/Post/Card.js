import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { AuthUserContext } from "../../context/UserContext";
import { dateParser } from "../Routes/utils";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
    const authId = useContext(AuthUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState(post);
    const [updatePost, setUpdatePost] = useState(false);
    const [newImage, setNewImage] = useState();


    useEffect(() => {
        postData && 
        setIsLoading(false);
    }, [postData])

// Gère l'état pour permettre de modifier le POST
    const updateHandler = useCallback(() => {
        setUpdatePost((updatePost) => !updatePost)
    }, []);

// Gère l'état de l'ajout de l'image
    const modifyImageHandler = (e) => {
        setNewImage(e.target.files[0]);
    }

    const messageUpdateRef = useRef();

// Mise à jour du POST avec une requête vers l'API
    const modifyHandler = useCallback((e) => {
        e.preventDefault();

        const updatedMessage = messageUpdateRef.current.value;

        postData.message = updatedMessage;

        const updateStateFormData = {
            "message": updatedMessage
        };

        const formData = new FormData();

        formData.append("image", newImage);
        formData.append("post", JSON.stringify(updateStateFormData));

        const url = `http://localhost:4000/api/posts/${post._id}`
        const uploadHandler = async () => {
            try{
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData
                })
                const responseData = await response.json();
                    if(response.ok) {
                        console.log("response data ok", responseData)
                        setUpdatePost(false);
                        postData.image = responseData.postObject.image;
                    } else {
                        console.log("Pas ok", responseData.error);  
                    }
                } catch(error) {
                    console.log("Error upload", error)
                    setUpdatePost(false)
                };
        }
        uploadHandler();
    }, [post._id, newImage, postData]);
     
    return(
        <li className="card-list" key={post._id}>
        {isLoading ? (
            <div className="isLoading">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
            
        ) : (
            <div className="card-container">
              <div className="card">
                <header className="card-header">
                <div className="card-header-name">
                    <h3 className="firstName">{postData.firstName}</h3>
                    <h3 className="Lastname">{postData.lastName}</h3>
                </div>
                <span className="card-timeStamp">{dateParser(post.createdAt)}</span>
                </header>
                <div className="card-middle">
                { postData.image ?
                    (<div className="card-img">
                        <img className="img" src={postData.image} alt={ updatePost ? ("Image choisit par l'utilisateur"):(null)} />
                    </div>) : null}
                    <div className="card-input-file-container">
                    { !updatePost ? ( null ) : 
                    (   <input  
                            className="card-input-file"
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={modifyImageHandler}
                            accept=".jpg, .jpeg, .png"
                        /> )
                    }
                    </div>
                    <div className="card-message">
                        { updatePost === false &&  <p>{postData.message}</p>}
                        { updatePost && 
                        <div className="update-post">
                            <textarea 
                                className="post-message"
                                defaultValue={postData.message} 
                                ref={messageUpdateRef}
                                />
                        </div>
                        }
                    </div>
                </div>
                <div className="card-btn-container">
                    <LikeButton 
                        post={post} 
                        key={post._id}
                    />
                    { authId.userId === post.userId || authId.role === "admin" ? (
                        <div className="card-update-delete">
                        { !updatePost ? (
                            <button
                                type='button'
                                onClick={updateHandler} 
                                className="card-btn-update" 
                                alt="Bouton pour modifier l'article">
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                        ) : (
                            <button 
                                type='submit'
                                onClick={modifyHandler} 
                                className="card-btn-update-validate" 
                                alt="Bouton pour modifier l'article">
                                <i className="fa-solid fa-circle-check"></i>
                            </button>
                        )}
                            <DeleteButton 
                                id={post._id} 
                                post={post}                 
                            />
                        </div>
                    ) : (null)}
                    </div>
                </div>
            </div>
        )}
        </li> 
    )
};

export default Card;