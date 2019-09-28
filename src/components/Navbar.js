import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OwlFuseButton from "../util/OwlFuseButton";
import OwlFuseTitle from "../images/owlfuse-title.png";

// MUI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import AddSparkIcon from "./icons/AddSparkIcon";
import SizzleIcon from "./icons/SizzleIcon";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Fragment>
          <img
            src={OwlFuseTitle}
            alt="OwlFuse Title Logo"
            className="nav-logo"
          />
          <hr className="bar-separator" />
        </Fragment>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <OwlFuseButton tip="SPARK AN INTEREST">
                <AddSparkIcon />
              </OwlFuseButton>
              <OwlFuseButton tip="VIEW YOUR SIZZLES">
                <SizzleIcon />
              </OwlFuseButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                <strong>LOGIN</strong>
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <strong>SIGN UP</strong>
              </Button>
              <Button color="inherit" component={Link} to="/reset">
                <strong>RESET PW</strong>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
