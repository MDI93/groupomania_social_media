import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from './Post/Card'

const Thread = ({data}) => {
    const [dataThread, setDataThread] = useState(data, true);
    const posts = data.data;

    useEffect(() => {
        setDataThread(data, false)
    }, [data]);
    console.log("fil d'actualité données", dataThread)

    return(
        <div className="Cards-container">
            <StyledUl>
            {posts &&
                posts.map((post) => {
                    return <Card post={post} key={post._id}/>
                })}
            </StyledUl>
        </div>
    )
}
export default Thread;

const StyledUl = styled.ul`
       list-style-type: none;
`
