import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Components
import Spark from "../components/sparks/Spark";
import Boozula from "../components/boozulas/Boozula";
import StaticProfile from "../components/StaticProfile";
import SparkSkeleton from '../util/SparkSkeleton';
import BoozulaSkeleton from '../util/BoozulaSkeleton';

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Icons
import FlameIcon from '../components/icons/FlameIcon';

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    sparkIdParam: null,
    boozIdParam: null
  };
  componentDidMount() {
    const clozang = this.props.match.params.clozang;
    const sparkId = this.props.match.params.sparkId;
    const boozId = this.props.match.params.boozId;
    
    if (sparkId) this.setState({ sparkIdParam: sparkId });
    if (boozId) this.setState({ boozIdParam: boozId });

    this.props.getUserData(clozang);
    axios
      .get(`/user/${clozang}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { sparks, boozulas, loading } = this.props.data;
    const { sparkIdParam, boozIdParam } = this.state;

    let sparksMarkup = loading ? (
      <SparkSkeleton length={2}/>
    ) : sparks === null ? (
      <strong className="center">This user has not lit any sparks yet.</strong>
    ) : !sparkIdParam ? (
      sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
        ) : (
            sparks.map(spark => {
              if (spark.sparkId !== sparkIdParam)
                return <Spark key={spark.sparkId} spark={spark} />
              else return <Spark key={spark.sparkId} spark={spark} openDialog/>
      })
    );

    let boozulasMarkup = loading ? (
      <BoozulaSkeleton />
    ) : boozulas === null || boozulas.length === 0 ? (
      <strong className="center">This user has not created any boozulas yet.</strong>
    ) : !boozIdParam ? (
      boozulas.map(boozula => (
        <Boozula key={boozula.boozId} boozula={boozula} />
      ))
        ) : (
            boozulas.map(boozula => {
              if (boozula.boozId !== boozIdParam)
                return <Boozula key={boozula.boozId} boozula={boozula} />
              else return <Boozula key={boozula.boozId} boozula={boozula} openDialog/>
        })    
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
            <strong>BOOZULAS</strong>
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
