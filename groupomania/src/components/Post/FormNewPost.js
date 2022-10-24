import React, {useContext, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import {AuthUserContext} from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const FormNewPost = () => {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn
    const [formNewPostSubmit, setFormNewPostSubmit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [file, setFile] = useState()
    const [errorPost, setErrorPost] = useState(false);
    const navigate = useNavigate();
    
    const handleFormNewPost = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("post", JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            message: message
        }));
        formData.append("image", image);
        axios.create({
            baseURL: "http://localhost:4000/api",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).post("/posts/", formData, {
            headers: {
                "Accept": "*/*",
                // "Content-Type": "multipart/form-data"
            },
        }).then((res) => {
            console.log(res)
            if (res.error) {
                setErrorPost(res.error)
            } else {
                setFormNewPostSubmit(true);
                navigate('/home', {replace: true})
                alert("Bravo! Votre article a bien été créé. :)")
            }
        })
            .catch((error) => console.log(error))
    }
    console.log("submit", setFormNewPostSubmit)

    const handleImage = (e) => {
        console.log("insere de l'image", e)
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log("stock image", setImage(URL.createObjectURL(e.target.files[0])))
    }

    const cancelPost = () => {
        setFirstName('');
        setLastName('');
        setImage('');
        setMessage('');
        setFile('');
    }

    return (
        <>
            <StyledFormContainer>
                <StyledForm action="" onSubmit={handleFormNewPost} className="new-post-form">
                    <StyledH3 htmlFor="newPost">Créer un nouvel article</StyledH3>
                    <label htmlFor="firstName">Prénom</label>
                        <StyledInput
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <br/>
                    <label htmlFor="lastName">Nom</label>
                        <StyledInput
                            type="text"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        <br/>
                    <label htmlFor="image">Insérer une image</label>
                        <input
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={(e) => handleImage(e)}
                            accept=".jpg, .jpeg, .png"
                        />
                        <br/>
                    <label htmlFor="message">Votre commentaire</label>
                        <StyledTextarea
                            type="text"
                            name="message"
                            placeholder=" Entrez votre message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <br />
                        {firstName || lastName || message || image ? (
                        <StyledBtnCancel className="cancel" onClick={cancelPost}>
                            Annuler
                        </StyledBtnCancel>
                        ) : null}
                        <br />
                        <StyledBtnSubmit type="submit">
                            Envoyer <i class="fa-solid fa-paper-plane"></i>
                        </StyledBtnSubmit>
                        <br/>
                        {errorPost &&
                        <StyledError>{errorPost}</StyledError>
                        }
                    </StyledForm>
                </StyledFormContainer>
        </>
    )

}
// }

export default FormNewPost;

const StyledFormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 50%;
    border-radius: 10px 10px;   
    background: linear-gradient(#4E5166, white);
    box-shadow: 2px 5px 10px #FD2D01;
`
const StyledH3 = styled.h3`
    padding: 10px 30px 10px 30px;
    border-radius: 15px 15px;
    border-right: 3px solid #FD2D01;
    border-bottom: 3px solid #FD2D01;
`
const StyledInput = styled.input`
    width: 60%;
    border-radius: 15px 15px;
    height: 30px;
`
const StyledTextarea = styled.textarea`
    border-radius: 10px 10px;
    min-height: 60px;
    width: 80%;
`
const StyledBtnSubmit = styled.button`
    color: #8186a0;
    font-size: 18px;
    border-radius: 15px 15px;
    padding: 10px;
    width: 30%;
    &:hover {
        color: white;
        background: linear-gradient(white, green);
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`
const StyledBtnCancel = styled.button`
    color: #8186a0;
    font-size: 18px;
    border-radius: 15px 15px;
    padding: 10px;
    width: 30%;
    &:hover {
        color: white;
        background: linear-gradient(white, #FD2D01);
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`
const StyledError = styled.span`
    color: red;
    padding-bottom:5px;
    font-size: 14px;
`