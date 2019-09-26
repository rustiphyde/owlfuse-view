import React, { Component } from 'react';

// MUI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color="inherit">LOGIN</Button>
                    <Button color="inherit">HOME</Button>
                    <Button color="inherit">SIGN UP</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar