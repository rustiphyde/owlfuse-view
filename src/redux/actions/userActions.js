import {
  SET_ERRORS,
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  MARK_SIZZLES_READ
} from "../types";

import adminUser from '../../util/adminUser';

import axios from "axios";

export const loginUser = (userData, history) => (dispatch, getState, { getFirebase }) => {
  dispatch({ type: LOADING_UI });
  const firebase = getFirebase();
  firebase.login({ email: adminUser.email, password: adminUser.password });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDetails());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserDetails());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserDetails = () => dispatch => {
  dispatch({ type: LOADING_USER })
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

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(res => {
      dispatch(getUserDetails());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserDetails());
    })
    .catch(err => console.log(err));
};

export const resetPassword = (userData) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
  .post("/reset", userData)
  .then(res => {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_SUCCESS,
      payload: res.data
    });
  })
  .then(() => {
    setTimeout(() => {dispatch({ type: CLEAR_SUCCESS })}, 5000);      
  })
  .catch(err => {
    dispatch({ type: CLEAR_SUCCESS });
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });
};

export const markSizzlesRead = (sizzleIds) => dispatch => {
  axios.post('/sizzles', sizzleIds)
    .then(res => {
      dispatch({
        type: MARK_SIZZLES_READ
      })
    })
    .catch(err => console.log(err));
} 


// Helper fxn for setting authorization header in various places
const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
