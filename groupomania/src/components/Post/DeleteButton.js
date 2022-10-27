import axios from 'axios';
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { AuthUserContext } from '../../context/UserContext';

const DeleteButton = ({ post }) => {
  const authId = useContext(AuthUserContext);
  const isLoggedIn = authId.isLoggedIn;
  const [deletePost, setDeletePost] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const deleteHandler = (e) => {
    axios.delete(`${process.env.REACT_APP_URL_API}/posts/${post._id}`, {
      headers:{
        Authorization: `Bearer ${authId.auth}`
      },
      data: post.userId
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
      <StyledBtnDiv>
        <StyledBtnCard 
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
        </StyledBtnCard>
      </StyledBtnDiv>
      )}
    </>
    
  )};

export default DeleteButton;


const StyledBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`
const StyledBtnCard = styled.button`
    color: #8186a0;
    font-size: 18px;
    border-radius: 20px;
    height: 30px;
    &:hover {
        color: red;
        background-color: #FFD7D7;
        cursor: pointer;
  	    transform: scale(1.08);
    } 
`