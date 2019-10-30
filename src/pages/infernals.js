import React, { Component } from "react";
import PropTypes from 'prop-types';
// MUI Stuff
import Grid from "@material-ui/core/Grid";
// Components
import Infernal from "../components/infernals/Infernal";

import { connect } from "react-redux";
import { getInfernals } from "../redux/actions/dataActions";


class infernals extends Component {
  componentDidMount() {
    this.props.getInfernals();
  }
  render() {
    const { infernals, loading } = this.props.data;
    let recentInfernalMarkup = !loading ? (
      infernals.map(infernal => <Infernal key={infernal.infernalId} infernal={infernal} />)
    ) : (
      <p className="loading"><strong>Loading...</strong></p>
    );
    return (
      <Grid container spacing={2} className="fireGrid">
        <Grid item sm={2}/>
        <Grid item sm={8} xs={12}>
          <div className="sparkTitle">
          <strong><em>INFERNALS</em></strong>
          <hr className="bar-separator"/>
          </div>
          {recentInfernalMarkup}
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    );
  }
}

infernals.propTypes = {
  getInfernals: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getInfernals })(infernals);
