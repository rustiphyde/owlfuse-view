import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI } from "./types";
import axios from 'axios';

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch(getAuthenticatedUser());
      dispatchEvent({ type: CLEAR_ERRORS })
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    });
};

// action creator for fetching an authenticated user's data
export const getAuthenticatedUser = () => dispatch => {
    axios
      .get("/user")
      .then(res => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };