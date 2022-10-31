import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../../context/UserContext';

const DeleteButton = ({ post }) => {
  const authId = useContext(AuthUserContext);
  const isLoggedIn = authId.isLoggedIn;
  const [deletePost, setDeletePost] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const deleteHandler = (e) => {
// Requête pour supprimer un POST
    axios.delete(`${process.env.REACT_APP_URL_API}/posts/${post._id}`, {
      headers:{
        Authorization: `Bearer ${authId.auth}`
      },
      data: post._id    
    })
    .then((res) => {
        console.log(res)
      if(res.error) {
        setErrorMessage(res.error);
      } else {
        setDeletePost(false);
        
        window.location.reload();
      }
    })
    .catch((error) => console.log(error))
  };

  return (
    <>
    {isLoggedIn && (
      <div className="delete-btn-container"key={post._id}>
        <button
          onClick={() => {if(window.confirm('Voulez-vous vraiment supprimer cet article ?')){
            deleteHandler();
            }
          }}
          onChange={(e) => setDeletePost(e.target.value)}
          className="card-btn-delete" 
          alt="Bouton pour supprimer l'article"
          value={deletePost}
          >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      )}
    </>
    
  )};

export default DeleteButton;