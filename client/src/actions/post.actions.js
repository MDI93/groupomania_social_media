import axios from "axios";

export const GET_POSTS = "GET_POSTS";

export const getPost = () => {
    return(dispatch) => {
        return axios
            .get(`http://localhost:4000/api/posts/getAllPosts/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};