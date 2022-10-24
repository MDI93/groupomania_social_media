import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FormNewPost = () => {
    const [formNewPostSubmit, setFormNewPostSubmit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState(null);
    const [image, setImage] = useState("");
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
                "Content-Type": "multipart/form-data"
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

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const cancelPost = () => {
        setFirstName('');
        setLastName('');
        setImage('');
        setMessage('');
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
                        <StyledInputFile
                            type="file"
                            name="file"
                            id="file-upload"
                            onChange={changeHandler}
                            accept=".jpg, .jpeg, .png"
                        />
                        <br/>
                    <label htmlFor="message">Votre commentaire</label>
                        <StyledTextarea
                            type="text"
                            name="message"
                            placeholder=" Ecrivez votre message ici"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <br />
                        <ContainerButton>
                            {firstName || lastName || message || image ? (
                            <StyledBtnCancel className="cancel" onClick={cancelPost}>
                                Annuler
                            </StyledBtnCancel>
                            ) : null}
                            <StyledBtnSubmit type="submit">
                                Envoyer <i class="fa-solid fa-paper-plane"></i>
                            </StyledBtnSubmit>
                        </ContainerButton>
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
    background-color: #4E5166;
`
const StyledH3 = styled.h3`
    padding: 10px 30px 10px 30px;
    border-radius: 15px 15px;
    border-bottom: 3px solid #FD2D01;
    margin-bottom: 30px;
`
const StyledInput = styled.input`
    width: 60%;
    border-radius: 15px 15px;
    height: 30px;
    margin: 5px;
`
const StyledInputFile = styled.input`
    width: 40%;
    height: 30px;
    margin: 5px;
`
const StyledTextarea = styled.textarea`
    border-radius: 10px 10px;
    min-height: 60px;
    width: 80%;
    margin: 5px;
`
const ContainerButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const StyledBtnSubmit = styled.button`
    color: #8186a0;
    font-size: 18px;
    border-radius: 15px 15px;
    padding: 10px;
    width: 40%;
    margin: 10px;
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
    width: 40%;
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