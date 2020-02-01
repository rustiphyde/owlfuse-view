import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Spark from '../components/sparks/Spark';
import Candle from '../components/Candle';
import SparkSkeleton from '../util/SparkSkeleton';
import Toggle from '../components/Toggle';

// Icons
import FlameIcon from '../components/icons/FlameIcon';

// MUI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
// Redux
import { connect } from 'react-redux';
import { getSparks, getInfernals } from '../redux/actions/dataActions';

class home extends Component {
  // Initialize Component State for storing the Sparks
  state = {
    sparks: null,
    toggleChecked: false
  };

  toggleFunx = () => {

  }

  componentDidMount() {
    this.props.getSparks();
    this.props.getInfernals();
  }

  handleToggle = event => {
    if(event.target.checked){
      this.setState({ toggleChecked: true });
      console.log("toggle is checked");
    }
    else {
      this.setState({ toggleChecked: false });
      console.log("toggle is not checked");
    }
  }
  render() {
    
    const { sparks, infernals, loading } = this.props.data; 
    
    let recentSparksMarkup = !loading ? (
      !this.state.toggleChecked ? (sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
      ) : (
        infernals.map(infernal => <Spark key={infernal.sparkId} spark={infernal} />))) : (
        <SparkSkeleton length={6}/>
    );
    return (
      <Grid container spacing={2}>        
       
        <Grid item sm={8} xs={12}>
        <div className="centered"><span className="toggle-text toggle-is--active">Most Recent</span><Toggle toggleFunx={this.handleToggle} /><span className="toggle-text">Scorch Rank</span></div>
          <div className="sparkTitle">
            <strong>SPARKS</strong>
            <hr className="bar-separator"/>
          </div>
          {recentSparksMarkup}
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

home.propTypes = {
  getSparks: PropTypes.func.isRequired,
  getInfernals: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
})


export default connect(mapStateToProps, { getSparks, getInfernals })(home);