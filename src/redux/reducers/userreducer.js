import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_HEAT,
  REMOVE_HEAT,
  ADD_CHEERS,
  REMOVE_CHEERS,
  MARK_SIZZLES_READ,
  MARK_CLINKS_READ
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
    case MARK_SIZZLES_READ:
      state.sizzles.forEach(sizz => sizz.read = true);
      return {
        ...state
      }
      case MARK_CLINKS_READ:
          state.clinks.forEach(clink => clink.read = true);
          return {
            ...state
          }
    default:
      return state;
  }
}