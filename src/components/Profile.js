import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
// Icons
// Redux Stuff
import { connect } from "react-redux";

const styles = {

}

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentiials: { alias, clozang, createdAt, imageUrl, bio, website, location },
        loading
      }
    } = this.props;
    return <div />;
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));