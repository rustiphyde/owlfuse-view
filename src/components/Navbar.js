import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export class Navbar extends Component {
    render() {
        return (
            <AppBar>
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