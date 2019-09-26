import React, { Component } from 'react'
// MUI Stuff
import Grid from '@material-ui/core/Grid';

class home extends Component {
    render() {
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                <p>Content...</p>
                </Grid>
                <Grid item sm={4} xs={12}>
                <p>Profile...</p>
                </Grid>    
            </Grid>
        )
    }
}

export default home