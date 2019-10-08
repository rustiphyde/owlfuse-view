import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Components
import Spark from "../components/sparks/Spark";
import Boozula from "../components/boozulas/Boozula";
import StaticProfile from "../components/StaticProfile";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Icons
import FlameIcon from '../components/icons/FlameIcon';

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null
  };
  componentDidMount() {
    const alias = this.props.match.params.alias;
    
    this.props.getUserData(alias);
    axios
      .get(`/user/${alias}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { sparks, boozulas, loading } = this.props.data;

    let sparksMarkup = loading ? (
      <p>Loading Data...</p>
    ) : sparks === null ? (
      <strong>This user has not lit any sparks yet.</strong>
    ) : (
      sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
    );

    let boozulasMarkup = loading ? (
      <p>Loading Data...</p>
    ) : boozulas === null ? (
      <strong>This user has not created any boozulas yet.</strong>
    ) : (
      boozulas.map(boozula => (
        <Boozula key={boozula.boozId} boozula={boozula} />
      ))
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
        
          <div className="sparkTitle">
            <strong>CANDLE</strong>
            <hr className="bar-separator" />
          </div>
          <div className="candle" width="100%">
            <FlameIcon className="icon7"/>
        </div>
          {this.state.profile === null ? (
            <p>Loading Candle...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          <div className="sparkTitle">
            <strong>SPARKS</strong>
            <hr className="bar-separator" />
          </div>
          {sparksMarkup}
          <div className="sparkTitle">
            <strong>{`BOOZULAS`}</strong>
            <hr className="bar-separator" />
          </div>
          {boozulasMarkup}
        </Grid>
        
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
