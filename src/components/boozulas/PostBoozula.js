import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { buildNewBoozula, clearErrors } from "../../redux/actions/dataActions";
import AddBoozulaIcon from "../icons/AddBoozulaIcon";
import OwlFuseButton from "../../util/OwlFuseButton";
import CloseIcon from "../icons/CloseIcon";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.themeMinusPalette,
  displayLinebreaks: {
    whiteSpace: "pre-wrap"
  },
    submitButton: {
      position: "relative",
      margin: '10px auto'
    },
    progressSpinner: {
      position: "absolute"
    },
    closeButton: {
      position: "absolute",
      left: "80%",
      top: "2%"
    },
    textField: {
        textAlign: 'center'
    }
  });

class PostBoozula extends Component {
  state = {
    open: false,
    drinkName: "",
    mainAlcohol: "",
    ingredients: "",
    preparation: "",
    drinkWare: "",
    garnish: "",
    boozImage: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        drinkName: "",
        mainAlcohol: "",
        ingredients: "",
        preparation: "",
        drinkWare: "",
        garnish: "",
        boozImage: "",
        open: false,
        errors: {}
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.buildNewBoozula({
      drinkName: this.state.drinkName,
      mainAlcohol: this.state.mainAlcohol,
      ingredients: this.state.ingredients,
      preparation: this.state.preparation,
      drinkWare: this.state.drinkWare,
      garnish: this.state.garnish,
      boozImage: ""
    });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <OwlFuseButton onClick={this.handleOpen} tip="POST A BOOZULA">
          <AddBoozulaIcon className="icon5 rust" color="primary" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <OwlFuseButton
            tip="CLOSE"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon className="rust"/>
          </OwlFuseButton>
          <DialogTitle variant="h5" className="rusty">POST A NEW BOOZULA</DialogTitle>
          <DialogContent className="rust-border">
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="drinkName"
                type="text"
                label="Name Your Boozula"
                placeholder="BOOZULA NAME"
                error={errors.drinkName ? true : false}
                helperText={errors.drinkName}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="mainAlcohol"
                type="text"
                label="What type of Alcohol is it made with?"
                placeholder="MAIN ALCOHOL"
                error={errors.mainAlcohol ? true : false}
                helperText={errors.mainAlcohol}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="ingredients"
                type="text"
                label="What are the Ingredients?"
                placeholder="INGREDIENTS"
                multiline
                rows="2"
                className={classes.textField, classes.displayLinebreaks}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="preparation"
                type="text"
                label="How do you make it?"
                placeholder="PREPARATION"
                multiline
                rows="2"
                className={classes.textField, classes.displayLineBreaks}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="drinkWare"
                type="text"
                label="What is it typically served in?"
                placeholder="DRINK WARE"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="garnish"
                type="text"
                label="How is it typically garnished?"
                placeholder="GARNISH"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <hr />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                DONE
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostBoozula.propTypes = {
  buildNewBoozula: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToProps = {
  buildNewBoozula,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostBoozula));
