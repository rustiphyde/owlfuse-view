import {
  SET_SPARKS,
  SET_SPARK,
  SET_INFERNALS,
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
  ADD_TOAST,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  CLEAR_SUCCESS,
  SET_SUCCESS,
  STOP_LOADING_UI,
  SET_FUSERS
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

export const getSpark = sparkId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/spark/${sparkId}`)
    .then(res => {
      dispatch({
        type: SET_SPARK,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// fetch all infernals
export const getInfernals = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/hot/sparks")
    .then(res => {
      dispatch({
        type: SET_INFERNALS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_INFERNALS,
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

export const getOkelist = okeId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/okelist/${okeId}`)
    .then(res => {
      dispatch({
        type: SET_OKELIST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const getFusers = () => dispatch => {
	axios
		.get("/fusers")
		.then(res => {
			dispatch({
				type: SET_FUSERS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_FUSERS,
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

export const getBoozula = boozId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/boozula/${boozId}`)
    .then(res => {
      dispatch({
        type: SET_BOOZULA,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post a spark
export const postSpark = newSpark => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/spark", newSpark)
    .then(res => {
      dispatch({ type: POST_SPARK, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Submit a stoke
export const addStoke = (sparkId, stokeData) => dispatch => {
  axios
    .post(`/spark/${sparkId}/stoke`, stokeData)
    .then(res => {
      dispatch({
        type: ADD_STOKE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addToast = (boozId, toastData) => dispatch => {
  axios
    .post(`/boozula/${boozId}/toast`, toastData)
    .then(res => {
      dispatch({
        type: ADD_TOAST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addSong = (okeId, songData) => dispatch => {
  axios
    .post(`/okelist/${okeId}/song`, songData)
    .then(res => {
      dispatch({
        type: ADD_SONG,
        payload: res.data
      });
      console.log(res.data);
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Post a Boozula
export const buildNewBoozula = newBoozula => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/boozula", newBoozula)
    .then(res => {
      dispatch({ type: BUILD_BOOZULA, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Post a new Okelist
export const buildNewOkeList = newOkeList => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/okelist", newOkeList)
    .then(res => {
      dispatch({ type: BUILD_OKE, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

export const emptyBoozula = boozId => dispatch => {
  axios
    .delete(`/boozula/${boozId}`)
    .then(() => {
      dispatch({ type: EMPTY_BOOZULA, payload: boozId });
    })
    .catch(err => console.log(err));
};

export const eraseOkelist = okeId => dispatch => {
  axios
    .delete(`okelist/${okeId}`)
    .then(() => {
      dispatch({ type: ERASE_OKE, payload: okeId });
    })
    .catch(err => console.log(err));
};

// action creator for clearing errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

// action creator for clearing successes
export const clearSuccess = () => dispatch => {
  dispatch({ type: CLEAR_SUCCESS });
};

export const getBoozData = boozId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/boozulas")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SET_BOOZULAS,
        payload: res.data
      });

      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const uploadBoozImage = (boozId, formData) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/boozula/${boozId}/image`, formData)
    .then(res => {
      dispatch({
        type: CHANGE_BOOZ_IMAGE,
        payload: res.data
      });
      dispatch(getBoozData());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const editBoozDetails = (boozId, boozDetails) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/boozula/${boozId}/add`, boozDetails)
    .then(() => {
      dispatch(getBoozData());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const choozByList = okeId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/song/${okeId}/list/chooz`)
    .then(res => {
      dispatch({
        type: CHOOZ_BY_LIST,
        payload: res.data
      });
      dispatch({
        type: SET_SUCCESS,
        payload: res.data
      });
      dispatch(clearErrors());
      console.log(res.data);
      dispatch({ type: STOP_LOADING_UI });
    })
    .then(() => {
      dispatch(clearSuccess());
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = userClozang => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userClozang}`)
    .then(res => {
      dispatch({
        type: SET_INFERNALS,
        payload: res.data.infernals
      });
      dispatch({
        type: SET_SPARKS,
        payload: res.data.sparks
      });
      dispatch({
        type: SET_BOOZULAS,
        payload: res.data.boozulas
      });
    })
    .catch(() => {
      dispatch({
        type: SET_INFERNALS,
        payload: null
      });
      dispatch({
        type: SET_SPARKS,
        payload: null
      });
      dispatch({
        type: SET_BOOZULAS,
        payload: null
      });
    });
};
