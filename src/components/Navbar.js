import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OwlFuseButton from "../util/OwlFuseButton";
import OwlFuseTitle from "../images/owlfuse-title.png";
import PostSpark from './sparks/PostSpark';

// MUI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import SizzleIcon from "./icons/SizzleIcon";
import HomeIcon from "./icons/HomeIcon";
import OkelistIcon from "./icons/OkelistIcon";
import BoozulaIcon from './icons/BoozulaIcon';

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
              <PostSpark/>
                        <Link to="/boozulas">
                <OwlFuseButton tip="BOOZULAS">
                  <BoozulaIcon />
                </OwlFuseButton>
              </Link>
              <Link to="/">
                <OwlFuseButton tip="GO HOME">
                  <HomeIcon />
                </OwlFuseButton>
              </Link>
              <Link to="/okelists">
                <OwlFuseButton tip="OKELISTS">
                  <OkelistIcon />
                </OwlFuseButton>
              </Link>
              <OwlFuseButton tip="SIZZLES & CLINKS">
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
