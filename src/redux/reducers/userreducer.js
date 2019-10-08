import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_HEAT,
  REMOVE_HEAT,
  ADD_CHEERS,
  REMOVE_CHEERS
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  heat: [],
  sizzles: [],
  cheers: [],
  clinks: []
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
              userAlias: state.credentials.alias,
              sparkId: action.payload.sparkId
            }
          ]
      };
      case ADD_CHEERS:
        return {
          ...state,
          cheers: [
            ...state.cheers,
            {
              userAlias: state.credentials.alias,
              boozId: action.payload.boozId
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
      case REMOVE_CHEERS:
        return {
          ...state,
          cheers: state.cheers.filter(
            cheer => cheer.boozId !== action.payload.boozId
          )
        };
    default:
      return state;
  }
}