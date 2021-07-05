import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/owlfuse-logo-big.png";
import { Link } from "react-router-dom";

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.themeMinusPalette
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      alias: "",
      loading: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    // Save input to newUserData variable
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      alias: this.state.alias
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading, errors }} = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={AppIcon}
            alt="OwlFuse Logo"
            className={classes.image}
            width="120"
          />
          <Typography variant="h4" className={classes.pageTitle}>
            <strong>SIGN UP</strong>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="EMAIL ADDRESS"
              className={classes.textField}
              helperText={errors && errors.email ? errors.email : ""}
              error={errors && errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              autoComplete="email"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="PASSWORD"
              className={classes.textField}
              helperText={errors && errors.password ? errors.password : ""}
              error={errors && errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              autoComplete="new-password"
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="CONFIRM PASSWORD"
              className={classes.textField}
              helperText={errors && errors.confirmPassword ? errors.confirmPassword : ""}
              error={errors && errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              autoComplete="new-password"
            />
            <TextField
              id="alias"
              name="alias"
              type="name"
              label="ALIAS"
              className={classes.textField}
              helperText={errors && errors.alias ? errors.alias : ""}
              error={errors && errors.alias ? true : false}
              value={this.state.alias}
              onChange={this.handleChange}
              fullWidth
              autoComplete="username"
            />
            {errors && errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={loading}
            >
              <strong>SIGN UP</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              HAVE AN ACCOUNT? LOG IN <Link to="/login">HERE</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(signup));
