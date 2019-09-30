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
      case SET_SPARK:
        return {
          ...state,
          spark: action.payload
        }
      case SET_OKELISTS:
        return {
          ...state,
          okelists: action.payload,
          loading: false
      };
      case SET_OKELIST:
        return {
          ...state,
          okelist: action.payload
        }
      case SET_BOOZULAS:
        return {
          ...state,
          boozulas: action.payload,
          loading: false
      };
      case SET_BOOZULA:
        return {
          ...state,
          boozula: action.payload
        };
      case ADD_HEAT:
    case REMOVE_HEAT:
      let sparkIndex = state.sparks.findIndex(
        spark => spark.sparkId === action.payload.sparkId
      );
      state.sparks[sparkIndex] = action.payload;
      if (state.spark.sparkId === action.payload.sparkId){
        let temp = state.spark.stokes;
        state.spark = action.payload;
        state.spark.stokes = temp;
      }
      return {
        ...state
      };
      case POST_SPARK:
        return {
          ...state,
          sparks: [action.payload, ...state.sparks]
      };
      case ADD_STOKE:
        return {
          ...state,
          spark: {
            ...state.spark,
            stokes: [action.payload, ...state.spark.stokes]
          }
        }
      case BUILD_BOOZULA:
        return {
          ...state,
          boozulas: [action.payload, ...state.boozulas]
      };
      case BUILD_OKE:
        return {
          ...state,
          okelists: [action.payload, ...state.okelists]
        };
      case ADD_CHEERS:
        case REMOVE_CHEERS:
          let boozIndex = state.boozulas.findIndex(
            boozula => boozula.boozId === action.payload.boozId
          );
          state.boozulas[boozIndex] = action.payload;
          if (state.boozula.boozId === action.payload.boozId){
            let temp = state.boozula.toasts;
            state.boozula = action.payload;
            state.boozula.toasts = temp;
          }
          return {
            ...state
          };
      case EXTINGUISH_SPARK:
        let exIndex = state.sparks.findIndex(
          spark => spark.sparkId === action.payload
        );
        state.sparks.splice(exIndex, 1);
        return {
          ...state
      };
      case EMPTY_BOOZULA:
        let emptyIndex = state.boozulas.findIndex(
          boozula => boozula.boozId === action.payload
        );
        state.boozulas.splice(emptyIndex, 1);
        return {
          ...state
      };
      case CHANGE_BOOZ_IMAGE:
        let imgIndex = state.boozulas.findIndex(
          boozula => boozula.boozId === action.payload.boozId
        );
        state.boozulas[imgIndex] = action.payload;
        return {
          ...state
      };
      default:
        return state;
    }
  }
  