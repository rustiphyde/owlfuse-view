  
import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/owlfuse-logo-big.png";
import { Link } from "react-router-dom";
import axios from "axios";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.themeMinusPalette
})

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    // Save input to userData variable
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    axios.post('/login', userData)
    .then(res => {
        this.setState({
            loading: false
        });
        this.props.history.push('/');
    })
    .catch(err => {
        this.setState({
            errors: err.response.data,
            loading: false
        })
    })
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
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
            <strong>LOGIN</strong>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              type="email"
              label="EMAIL ADDRESS"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              label="PASSWORD"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
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
              <strong>LOGIN</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br />
            <small>
              NEED AN ACCOUNT? SIGN UP <Link to="/signup">HERE</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(login);