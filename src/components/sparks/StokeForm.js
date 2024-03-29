import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux Stuff
import { connect } from "react-redux";
import { addStoke } from "../../redux/actions/dataActions";

const styles = {
    form: {
        borderRadius: '16px 0 16px 0',
        padding: 16,
    border: '6px double #ff9800',
      backgroundColor: '#fefaf4'
    },
    textField: {
      margin: "16px auto",
    },
    button: {
      margin: "20px auto 2px",
      width: "144px",
      position: 'relative',
      color: '#ff9800',
      borderRadius: '16px 0 16px 0'
    },
    gridItem: {
      textAlign: "center",
      margin: '0 auto',
      backgroundColor: '#263238'
    }
  };

class StokeForm extends Component {
  state = {
    body: "",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addStoke(this.props.sparkId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated, UI: {
      errors
    } } = this.props;

    const stokeFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.gridItem}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            name="body"
            type="text"
            label="ADD A STOKE"
            error={errors && errors.stoke ? true : false}
            helperText={errors && errors.stoke ? errors.stoke : ""}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField} 
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            STOKE IT
          </Button>
        </form>
      </Grid>
    ) : null;
    return stokeFormMarkup;
  }
}

StokeForm.propTypes = {
  addStoke: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  sparkId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { addStoke }
)(withStyles(styles)(StokeForm));
