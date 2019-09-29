import {
  SET_SPARKS,
  SET_SPARK,
  POST_SPARK,
  BUILD_BOOZULA,
  BUILD_OKE,
  ADD_HEAT,
  REMOVE_HEAT,
  LOADING_DATA,
  SET_OKELISTS,
  SET_OKELIST,
  CHOOZ_BY_LIST,
  SET_BOOZULA,
  SET_BOOZULAS,
  EXTINGUISH_SPARK,
  ADD_CHEERS,
  REMOVE_CHEERS,
  EMPTY_BOOZULA,
  CHANGE_BOOZ_IMAGE,
  ERASE_OKE,
  ADD_SONG,
  ADD_STOKE,
  ADD_TOAST
} from "../types";
import axios from "axios";

// fetch all sparks
export const getSparks = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/sparks")
    .then(res => {
      dispatch({
        type: SET_SPARKS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SPARKS,
        payload: []
      });
    });
};

// fetch all okelists
export const getOkelists = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/okelists")
    .then(res => {
      dispatch({
        type: SET_OKELISTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_OKELISTS,
        payload: []
      });
    });
};

// fetch all boozulas
export const getBoozulas = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/boozulas")
    .then(res => {
      dispatch({
        type: SET_BOOZULAS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BOOZULAS,
        payload: []
      });
    });
};

// Add heat to spark
export const addHeat = sparkId => dispatch => {
  axios
    .get(`/spark/${sparkId}/burn`)
    .then(res => {
      dispatch({
        type: ADD_HEAT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addCheers = boozId => dispatch => {
  axios
    .get(`boozula/${boozId}/cheers`)
    .then(res => {
      dispatch({
        type: ADD_CHEERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Remove heat from spark
export const removeHeat = sparkId => dispatch => {
  axios
    .get(`/spark/${sparkId}/snuff`)
    .then(res => {
      dispatch({
        type: REMOVE_HEAT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const removeCheers = boozId => dispatch => {
  axios
    .get(`boozula/${boozId}/uncheers`)
    .then(res => {
      dispatch({
        type: REMOVE_CHEERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const extinguishSpark = sparkId => dispatch => {
  axios
    .delete(`/spark/${sparkId}`)
    .then(() => {
      dispatch({ type: EXTINGUISH_SPARK, payload: sparkId });
    })
    .catch(err => console.log(err));
};