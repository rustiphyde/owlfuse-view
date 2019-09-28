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

const initialState = {
  sparks: [],
  spark: {},
  okelists: [],
  okelist: {},
  boozulas: [],
  boozula: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SPARKS:
      return {
        ...state,
        sparks: action.payload,
        loading: false
      };
      case SET_OKELISTS:
        return {
          ...state,
          okelists: action.payload,
          loading: false
      };
      case SET_BOOZULAS:
        return {
          ...state,
          boozulas: action.payload,
          loading: false
      };
      case ADD_HEAT:
    case REMOVE_HEAT:
      let index = state.sparks.findIndex(
        spark => spark.sparkId === action.payload.sparkId
      );
      state.sparks[index] = action.payload;
      if (state.spark.sparkId === action.payload.sparkId){
        let temp = state.spark.stokes;
        state.spark = action.payload;
        state.spark.stokes = temp;
      }
      return {
        ...state
      };
      default:
        return state;
    }
  }
  