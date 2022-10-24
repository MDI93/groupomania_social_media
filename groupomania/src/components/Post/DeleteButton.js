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
    console.log("------delete Post", deleteHandler )
    axios.delete(`${process.env.REACT_APP_URL_API}/posts/${post._id}`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: { post }
    })
    .then((res) => {
      console.log(res)
      if(res.error) {
        setErrorMessage(res.error);
      } else {
          setDeletePost(false);
      }
    })
    .catch((error) => console.log(error))
  };
  console.log("delete post", deleteHandler)

  return (
    <>
    {isLoggedIn && (
      <StyledBtnDiv>
        <StyledBtnCard 
          onClick={() => {if(window.confirm('Voulez-vous vraiment supprimer cet article ?')){
            deleteHandler();}
          }}
          onChange={(e) => setDeletePost(e.target.value)}
          className="card-btn-delete" 
          alt="Bouton pour supprimer l'article"
          value={deletePost}
          >
          <i class="fa-solid fa-trash"></i>
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