import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// Components
import Spark from '../components/sparks/Spark';
import Candle from '../components/Candle';

// Icons
import FlameIcon from '../components/icons/FlameIcon';

// MUI Components
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { getSparks } from '../redux/actions/dataActions';

class home extends Component {
  // Initialize Component State for storing the Sparks
  state = {
    sparks: null
  };
  componentDidMount() {
    this.props.getSparks();
  }
  render() {
    const { sparks, loading } = this.props.data; 
    let recentSparksMarkup = !loading ? (
      sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
    ) : (
      <p className="loading"><strong>Loading...</strong></p>
    );
    return (
      <Grid container spacing={2}>        
        
        <Grid item sm={8} xs={12}>
          <div className="sparkTitle">
            <strong><em>SPARKS</em></strong>
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
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
})


export default connect(mapStateToProps, { getSparks })(home);