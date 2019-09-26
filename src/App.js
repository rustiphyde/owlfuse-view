import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import themeFile from "./util/theme";

// MUI Components
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <BrowserRouter>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
        </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
