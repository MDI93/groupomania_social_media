import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (authUserId) => {
    return(dispatch) => {
        return axios
            .get(`http://localhost:4000/api/auth/${authUserId}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};