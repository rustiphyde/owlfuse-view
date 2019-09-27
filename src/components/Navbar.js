import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import OwlFuseTitle from '../images/owlfuse-title.png'


// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export class Navbar extends Component {
    render() {
        return (
            <AppBar>
            <Fragment>
            <img src={OwlFuseTitle} alt="OwlFuse Title Logo" className="nav-logo"/>          
            <hr className="bar-separator"/>
            </Fragment> 
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login"><strong>LOGIN</strong></Button>
                    <Button color="inherit" component={Link} to="/"><strong>HOME</strong></Button>
                    <Button color="inherit" component={Link} to="/signup"><strong>SIGN UP</strong></Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar