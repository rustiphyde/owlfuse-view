import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_HEAT,
  REMOVE_HEAT
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  heat: [],
  sizzles: []
};

export default function(state = initialState, action) {
  // perform appropriate actions according to type
  switch (action.type) {
    //catch the various type cases
    case SET_AUTHENTICATED:
      return {
        // spreads the state as it already exists and then changes certain elements as specified
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
      case ADD_HEAT:
        return {
          ...state,
          heat: [
            ...state.heat,
            {
              alias: state.credentials.alias,
              sparkId: action.payload.sparkId
            }
          ]
      };
      case REMOVE_HEAT:
        return {
          ...state,
          heat: state.heat.filter(
            burn => burn.sparkId !== action.payload.sparkId
          )
        };
    default:
      return state;
  }
}