// store file "stores" the application state
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { config } from '../util/config';
import { firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirestore, getFirebase })];

// Actual state 
const reducers = combineReducers({
  // Everything that comes from userReducer.js will be stored inside the user object
  user: userReducer,
  // Everything that comes from dataReducer.js will be stored inside the data object
  data: dataReducer,
  // Everything that comes from uiReducer.js will be stored inside the UI object
  UI: uiReducer,
  // Everthing that comes from firebaseReducer will be stored inside the firebase object
  firebase: firebaseReducer,
  // Everthing that comes from firestoreReducer will be stored inside the firestore object
  firestore: firestoreReducer
});

const enhancer = composeWithDevTools(applyMiddleware(...middleware), reduxFirestore(config));
const store = createStore(reducers, initialState, enhancer);

export default store;
