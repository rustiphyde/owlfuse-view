import React, { Component } from "react";
import PropTypes from 'prop-types';

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Components
import Boozula from "../components/boozulas/Boozula";
import PostBoozula from "../components/boozulas/PostBoozula";
import BoozulaSkeleton from '../util/BoozulaSkeleton';

// Redux Stuff
import { connect } from 'react-redux';
import { getBoozulas } from '../redux/actions/dataActions';

class boozulas extends Component {

  componentDidMount() {
    this.props.getBoozulas();
  }
  render() {
    const { boozulas, loading } = this.props.data;
    let recentBoozulasMarkup = !loading ? (
      boozulas.map(boozula => <Boozula key={boozula.boozId} boozula={boozula} />)
    ) : (
      <BoozulaSkeleton/>
    );
    return (
      <Grid container spacing={1}>
        <Grid item sm={2}/>
        <Grid item sm={8} xs={12}>
        <div className="boozTitle1">
            <strong>BOOZULAS</strong>
            <hr className="bar-separator-booz" />
            <PostBoozula />
            <hr className="bar-separator-booz"/>
          </div>
          {recentBoozulasMarkup}
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    );
  }
}

boozulas.propTypes = {
  getBoozulas: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getBoozulas })(boozulas);