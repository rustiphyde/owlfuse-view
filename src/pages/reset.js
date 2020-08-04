import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/owlfuse-logo-big.png";
import { Link } from "react-router-dom";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux Stuff
import { connect } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.themeMinusPalette
})

class reset extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false,
      errors: {},
      success: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
        this.setState({ errors: nextProps.UI.errors });
      }
      if(nextProps.UI.success){
          this.setState({ success: nextProps.UI.success });
      }
  }
  handleSubmit = event => {
    event.preventDefault();
    // Save input to userData variable
    const userData = {
        email: this.state.email
    };
    this.props.resetPassword(userData, this.props.history)
    
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors, success } = this.state;
    return (
      <Grid className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={AppIcon}
            alt="OwlFuse Logo"
            className={classes.image}
            width="120"
          />
          <Typography variant="h4" className={classes.pageTitle}>
            <strong>RESET PASSWORD</strong>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
              id="email"
              name="email"
              type="email"
              label="EMAIL ADDRESS"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              autoComplete="email"
            />
            {errors.reset && (
              <Typography variant="body2" className={classes.customError}>
                {errors.reset}
              </Typography>
            )}
            {success.message && (
              <Typography variant="body2" className={classes.customMessage}>
                {success.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={loading}
            >
              <strong>RESET PASSWORD</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br />
            <small>
              DON'T HAVE AN ACCOUNT? SIGN UP <Link to="/signup">HERE</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
reset.propTypes = {
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};
// Bring elements in from Global State and maps them to the Component State
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
const mapActionsToProps = {
    resetPassword
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(reset));