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
        borderRadius: 16,
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
      color: '#ff9800'
    },
    gridItem: {
      textAlign: "center",
      margin: '0 auto',
      backgroundColor: '#37474f'
    }
  };

class StokeForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({ errors: nextProps.UI.errors });
      }
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ body: ''});
      }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addStoke(this.props.sparkId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const stokeFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.gridItem}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            name="body"
            type="text"
            label="ADD A STOKE"
            error={errors.stoke ? true : false}
            helperText={errors.stoke}
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
