import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux Stuff
import { connect } from "react-redux";
import { addToast } from "../../redux/actions/dataActions";

const styles = {
    form: {
        borderRadius: 16,
        padding: 16,
    border: '6px double #f4db9d',
    backgroundColor: '#fefaf4'
    
    },
    textField: {
      margin: "16px auto",
    },
    button: {
      margin: "20px auto",
      width: "144px",
      position: 'relative',
      color: '#f4db9d'
    },
    gridItem: {
      textAlign: "center"
    }
  };

class ToastForm extends Component {
  state = {
    body: "",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addToast(this.props.boozId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated, UI: {
      errors
    } } = this.props;

    const toastFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.gridItem}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            name="body"
            type="text"
            label="ADD A TOAST"
            error={errors && errors.toast ? true : false}
            helperText={errors && errors.toast ? errors.toast : ""}            
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={`${this.props.classes.textField} foam`}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            TOAST IT
          </Button>
        </form>
      </Grid>
    ) : null;
    return toastFormMarkup;
  }
}

ToastForm.propTypes = {
  addToast: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  boozId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { addToast }
)(withStyles(styles)(ToastForm));
