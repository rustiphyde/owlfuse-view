import React, { Component } from 'react';
import axios from 'axios';
// MUI Stuff
import Grid from '@material-ui/core/Grid';

class home extends Component {
    // Initialize Component State for storing the Sparks
    state = {
        sparks: null
    }
    componentDidMount(){
        axios.get('/sparks')
          .then(res => {
            console.log(res.data);
            this.setState({
                sparks: res.data
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        let recentSparksMarkup = this.state.sparks ? (
            this.state.sparks.map(spark => <p>{spark.body}</p>) 
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                {recentSparksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                <p>Profile...</p>
                </Grid>    
            </Grid>
        )
    }
}

export default home;