import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../context/UserContext";
import styled from "styled-components";

const Logout = () => {
    const authId = useContext(AuthUserContext);
    const isLoggedIn = authId.isLoggedIn;
    return(
        <div>
        {isLoggedIn &&
                <Link onClick={authId.logout}>
                    <StyledDiv>
                        <StyledIcon className="fa-solid fa-right-from-bracket"></StyledIcon>
                    </StyledDiv>   
                </Link>
            }
        </div>
    )
}

const StyledDiv = styled.div`
    padding: 18px 10px 0px 0px
`
const StyledIcon = styled.i`
    font-size: 22px;
    :hover {
        color: red;
        }
`

export default Logout