import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Spark from '../components/sparks/Spark';
import Candle from '../components/Candle';
import SparkSkeleton from '../util/SparkSkeleton';

// Icons
import FlameIcon from '../components/icons/FlameIcon';

// MUI Components
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getSparks, getInfernals } from '../redux/actions/dataActions';

class home extends Component {
  // Initialize Component State for storing the Sparks
  state = {
    sparks: null,
    infernals: null
  };
  componentDidMount() {
    this.props.getInfernals();
    this.props.getSparks();
  }
  render() {
    const { sparks, infernals, loading } = this.props.data; 
    let recentInfernalsMarkup = !loading ? (
      infernals.map(infernal => <Spark key={infernal.sparkId} spark={infernal} />)
    ) : (
        <SparkSkeleton length={6}/>
    );
    let recentSparksMarkup = !loading ? (
      sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
    ) : (
        <SparkSkeleton length={6}/>
    );
    return (
      <Grid container spacing={2}>        
        
        <Grid item sm={8} xs={12}>
        <div className="sparkTitle">
            <strong>INFERNALS</strong>
            <hr className="bar-separator"/>
          </div>
          {recentInfernalsMarkup}
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