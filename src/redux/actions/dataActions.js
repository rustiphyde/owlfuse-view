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