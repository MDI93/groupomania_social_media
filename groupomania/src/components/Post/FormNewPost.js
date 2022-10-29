import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const FormNewPost = () => {
    const [formNewPostSubmit, setFormNewPostSubmit] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [message, setMessage] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleFormNewPost = (e) => {
        e.preventDefault();

        if(firstName.trim().length === 0 || lastName.trim().length === 0){
            setError({
                emptyInput: "Ce champ est requis"
            })
            return;
        };

        let formData = new FormData();
        formData.append("post", JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            message: message
        }));

// Ajoute le format image
        let addImage;
        if(e.target.files && e.target.files[0]){
            addImage = e.target.files[0]
        };
       
        setFormNewPostSubmit({
            "message": message,
            "image": addImage
        });

// Envoie une requête pour créer un POST
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
            if (res.error) {
                setError(res.error)
            } else {
                setFormNewPostSubmit(true);
                navigate("/home")
            }
        })
        .catch((error) => console.log(error))
    };

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
        {formNewPostSubmit ? (
        <>
            {alert("Votre article a bien été créé !")}
        </>
        ) : (
            <div className="newpost-form-container">
                <form action="" onSubmit={handleFormNewPost} className="newpost-form">
                    <h3 htmlFor="newPost">Créer un nouvel article</h3>
                    <label htmlFor="firstName">Prénom</label>
                        <input
                            className="newpost-form-input"
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        {error &&
                        <span className="newpost-form-error">{error.emptyInput}</span>}
                        <br/>
                    <label htmlFor="lastName">Nom</label>
                        <input
                            className="newpost-form-input"
                            type="text"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        {error &&
                        <span className="newpost-form-error">{error.emptyInput}</span>}
                        <br/>
                    <label htmlFor="image">Insérer une image</label>
                        <input
                            className="newpost-form-input-file"
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            accept=".jpg, .jpeg, .png"
                        />
                        <br/>
                    <label htmlFor="message">Votre commentaire</label>
                        <textarea
                            className="newpost-form-textarea"
                            type="text"
                            name="message"
                            placeholder=" Ecrivez votre message ici"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {error &&
                        <span className="newpost-form-error">{error.emptyInput}</span>}
                        <br />
                        <div className="newpost-form-button-container">
                            {firstName || lastName || message || image ? (
                            <button className="newpost-form-btn-cancel" onClick={cancelPost}>
                                Annuler
                            </button>
                            ) : null}
                            <button type="submit" className="newpost-form-btn-submit">
                                Envoyer <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                        <br/>
                    </form>
                </div>
            )}
        </>
    )

};

export default FormNewPost;
