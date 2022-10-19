import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const FormNewPost = () => {
    const [formNewPostSubmit, setFormNewPostSubmit] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    const handleFormNewPost = (event) => {
    event.preventDefault();

    axios({
        method: "post",
        url: `http://localhost:4000/api/posts/`,
        data: {
            firstName: firstName,
            lastName: lastName,
            // image: image,
            message: message
        }
    })
    .then((res) => {
        console.log(res)
        if(res.error) {
           setFormNewPostSubmit(res.error)
        } else {
            setFormNewPostSubmit(true);
        }
    })
    .catch((error) => console.log(error))
    }   
    return(
        <>
        {formNewPostSubmit ? (
        <>
            {/* <Thread /> */}
            {alert("Bravo! Votre article a bien été créé. :)")}
        </>    
        ) : (
            <StyledFormContainer>
            <StyledForm action="" onSubmit={handleFormNewPost} id="new-post-form">
                <StyledH3 htmlFor="newPost">Créer un nouvel article</StyledH3>
                <label htmlFor="firstName">Prénom</label>
                <StyledInput 
                    type="text" 
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                /> 
                <br />
                <label htmlFor="lastName">Nom</label>
                <StyledInput 
                    type="text" 
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />    
                <br />
                {/* <label htmlFor="image">Insérer une image</label>
                <input 
                    type="image" 
                    src=    
                    onChange={(e) => setImage(e.target.value)}
                /> */}
                <br />
                {/* <button type="submit">Insérer</button> */}
                <label htmlFor="message">Votre commentaire</label>
                <StyledTextarea
                    type="text" 
                    name="message"
                    placeholder=" Entrez votre message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />    
                <br />
                <StyledBtnSubmit type="submit">
                    Envoyer  <i class="fa-solid fa-paper-plane"></i>
                </StyledBtnSubmit>
                <br />
            </StyledForm>
        </StyledFormContainer>
        )}
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
    ${'' /* box-shadow: 2px 5px 10px #FD2D01; */}
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
    width: 40%;
    &:hover {
        color: white;
        background: linear-gradient(white, green);
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`