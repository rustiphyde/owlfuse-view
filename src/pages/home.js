import React, { Component } from 'react';
import axios from 'axios';
import AppIcon from "../images/owlfuse-logo-big.png";
// Components
import Spark from '../components/sparks/Spark';
import Fire from '../components/fires/Fire';
import Candle from '../components/Candle';

// Icons
import FlameIcon from '../components/icons/FlameIcon';

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
        <div className="sparkTitle">
            <strong>CANDLE</strong>
            <hr className="bar-separator"/>
          </div>
          <div className="candle" width="100%">
            <FlameIcon className="icon7"/>
        </div>
         
          <Candle/>
        </Grid>
      </Grid>
    );
  }
}

export default home;