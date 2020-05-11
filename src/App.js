import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from 'axios';

// Firebase
import firebase from 'firebase/app';
import { config } from './util/config';
import 'firebase/firestore';
import 'firebase/auth';

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from './redux/types';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { logoutUser, getUserDetails } from './redux/actions/userActions'

// Util imports
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";

// MUI Components
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import user from "./pages/user";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import reset from './pages/reset';
import okelists from './pages/okelists';
import boozulas from './pages/boozulas';
import howls from './pages/howls';
import sparks from './pages/sparks';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserDetails());
  }

} 

firebase.initializeApp(config);
firebase.firestore();

const rrfConfig = {
  userProfile: 'Users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/okelists" component={okelists} />
                <Route exact path="/boozulas" component={boozulas} />
                <Route exact path="/howls" component={howls} />
                <Route exact path="/sparks" component={sparks} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                />
                <AuthRoute
                exact
                path="/reset"
                component={reset}
                />
                <Route exact path="/:clozang" component={user} />
                <Route exact path="/:clozang/spark/:sparkId" component={user} />
                <Route exact path="/:clozang/boozula/:boozId" component={user}/>
              </Switch>
            </div>
            <Footer />
        </BrowserRouter>
        </ReactReduxFirebaseProvider>
        </Provider>        
      </MuiThemeProvider>
    );
  }
}

export default App;
