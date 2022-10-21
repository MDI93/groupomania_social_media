import React from 'react'
import styled from 'styled-components';

const DeleteButton = () => {
  const deleteQuote = () => {
    console.log("test supprime")
  }

  const deleteHandler = () => {

  }

  return (
    <StyledBtnDiv onClick={() => {
      if(window.confirm('Voulez-vous vraiment supprimer cet article ?')){
        deleteQuote();
      }
    }}>
        <StyledBtnCard className="card-btn-delete" alt="Bouton pour supprimer l'article">
                <i class="fa-solid fa-trash"></i>
        </StyledBtnCard>
    </StyledBtnDiv>
    
  )
}

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