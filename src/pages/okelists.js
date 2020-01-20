import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOkelists } from '../redux/actions/dataActions';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
// Components
import Okelist from "../components/okelists/Okelist";
import PostOkelist from '../components/okelists/PostOkelist';
import OkelistSkeleton from '../util/OkelistSkeleton';

class okelists extends Component {
  // Initialize Component State for storing the Sparks
  state = {
    okelists: null
  };
  componentDidMount() {
    this.props.getOkelists();
  }
  render() {
    const { okelists, loading } = this.props.data
    let recentOkelistsMarkup = !loading ? (
      okelists.map(okelist => <Okelist key={okelist.okeId} okelist={okelist} />)
    ) : (
      <OkelistSkeleton/>
    );
    return (
      <Grid container spacing={2} className="sheet">
      <Grid item sm={2}/>
        <Grid item sm={8} xs={12}>
        <div className="okeTitle">
          <strong>OKE LISTS</strong>
          <hr className="bar-separator-oke"/>
          <PostOkelist/>
          <hr className="bar-separator-oke"/>
          </div>
          {recentOkelistsMarkup}
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    );
  }
}

okelists.propTypes = {
  getOkelists: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getOkelists })(okelists);
