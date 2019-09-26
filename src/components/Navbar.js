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
                <Toolbar>
                    <Button color="inherit" component={Link} to="/login">LOGIN</Button>
                    <Button color="inherit" component={Link} to="/">HOME</Button>
                    <Button color="inherit" component={Link} to="/signup">SIGN UP</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar