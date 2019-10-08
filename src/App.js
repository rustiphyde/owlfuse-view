import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from 'axios';

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from './redux/types';
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


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/okelists" component={okelists} />
                <Route exact path="/boozulas" component={boozulas} />
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
                <Route exact path="/:alias" component={user} />
            </Switch>
            </div>
            <Footer />
        </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
