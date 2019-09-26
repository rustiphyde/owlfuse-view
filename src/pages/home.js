import React, { Component } from 'react';
import axios from 'axios';

// Components
import Spark from '../components/sparks/Spark';
import Fire from '../components/fires/Fire';

// MUI Components
import Grid from '@material-ui/core/Grid';

class home extends Component {
  // Initialize Component State for storing the Sparks
  state = {
    sparks: null,
    fires: null
  };
  componentDidMount() {
    axios
      .get("/sparks")
      .then(res => {
        this.setState({
          sparks: res.data
        });
      })
      .catch(err => console.log(err));
    
      axios
      .get("/fires")
      .then(res => {
        this.setState({
          fires: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentSparksMarkup = this.state.sparks ? (
      this.state.sparks.map(spark => <Spark key={spark.sparkId} spark={spark}/>)
    ) : (
      <p>Loading...</p>
      );
    
      let recentFiresMarkup = this.state.fires ? (
        this.state.fires.map(fire => <Fire key={fire.fireId} fire={fire}/>)
      ) : (
        <p>Loading...</p>
      );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
        
          <div className="sparkTitle">
            <strong>SPARKS</strong>
            <hr className="bar-separator"/>
          </div>
          {recentSparksMarkup}
          <div className="sparkTitle">
            <strong>FIRES</strong>
            <hr className="bar-separator"/>
          </div>
          {recentFiresMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;