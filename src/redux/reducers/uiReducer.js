import { SET_MESSAGE, CLEAR_MESSAGE, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_SUCCESS, CLEAR_SUCCESS, STOP_LOADING_UI } from '../types';

const initialState = {
    loading: false,
    errors: null,
    success: null
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
            case CLEAR_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    success: null
                }
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
        return {
            ...state,
            loading: true
        }
        case STOP_LOADING_UI:
                return {
                    ...state,
                    loading: false
                }
        default: 
        return state;
    }
}