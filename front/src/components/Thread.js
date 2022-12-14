import React, { useState, useEffect } from "react";
import Card from './Post/Card'

const Thread = ({ data, fetchData }) => {
    const [dataThread, setDataThread] = useState(data, true);
    const posts = data.data;

    useEffect(() => {
        setDataThread(data, false)
    }, [data]);

    return(
        <div className="Cards-container">
            <ul className="card-list-posts">
            {posts &&
                posts.map((post) => {
                    return <Card 
                        post={post} 
                        key={post._id}
                        fetchData={fetchData}   
                        />
                })}
            </ul>
        </div>
    )
}
export default Thread;