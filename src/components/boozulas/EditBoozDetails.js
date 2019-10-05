import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import EditBoozulaIcon from "../icons/EditBoozulaIcon";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Redux Stuff
import { connect } from "react-redux";
import { editBoozDetails } from "../../redux/actions/dataActions";

const styles = {
  displayLinebreaks: {
    whiteSpace: "pre-wrap"
  },

  dialog: {
    padding: 16,
    borderRadius: "32px"
  },
  form: {
    padding: 16
  },
  title: {
    color: "#b7410e",
    textAlign: "center"
  }
};

class EditBoozDetails extends Component {
  state = {
    drinkName: "",
    mainAlcohol: "",
    ingredients: "",
    preparation: "",
    drinkWare: "",
    garnish: "",
    boozId: "",
    open: false
  };
  mapBoozDetailsToState = () => {
    this.setState({
      drinkName: this.props.drinkName ? this.props.drinkName : "",
      mainAlcohol: this.props.mainAlcohol ? this.props.mainAlcohol : "",
      ingredients: this.props.ingredients ? this.props.ingredients : "",
      preparation: this.props.preparation ? this.props.preparation : "",
      drinkWare: this.props.drinkWare ? this.props.drinkWare : "",
      garnish: this.props.garnish ? this.props.garnish : ""
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapBoozDetailsToState(this.props);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.mapBoozDetailsToState(this.props);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const boozDetails = {
      drinkName: this.state.drinkName,
      mainAlcohol: this.state.mainAlcohol,
      ingredients: this.state.ingredients,
      preparation: this.state.preparation,
      drinkWare: this.state.drinkWare,
      garnish: this.state.garnish,
      boozImage: this.props.boozImage
    };
    this.props.editBoozDetails(this.props.boozId, boozDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <OwlFuseButton
          tip="EDIT YOUR BOOZULA"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditBoozulaIcon className="icon8 foam" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxwidth="sm"
          className={classes.dialog}
        >
          <DialogTitle variant="h5" className={classes.title}>
            EDIT YOUR DETAILS
          </DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <TextField
                name="drinkName"
                type="text"
                label="BOOZULA NAME"
                placeholder="NEW NAME HERE"
                className={classes.textField}
                value={this.state.drinkName}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="mainAlcohol"
                type="text"
                label="MAIN ALCOHOL"
                placeholder="MAIN ALCOHOL"
                className={classes.textField}
                value={this.state.mainAlcohol}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="ingredients"
                type="text"
                label="INGREDIENTS"
                multiline
                rows="3"
                placeholder="EDIT INGREDIENTS"
                className={classes.textField, classes.displayLinebreaks}
                value={this.state.ingredients}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="preparation"
                type="text"
                label="PREPARATION"
                multiline
                rows="3"
                placeholder="EDIT PREPARATION INSTRUCTIONS"
                className={classes.textField, classes.displayLineBreaks}
                value={this.state.preparation}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="drinkWare"
                type="text"
                label="DRINK WARE"
                placeholder="EDIT DRINK WARE INFO"
                className={classes.textField}
                value={this.state.drinkWare}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="garnish"
                type="text"
                label="GARNISH"
                placeholder="EDIT GARNISH"
                className={classes.textField}
                value={this.state.garnish}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="contained">
              CANCEL
            </Button>
            <Button onClick={this.handleSubmit} color="primary" variant="contained">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditBoozDetails.propTypes = {
  editBoozDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  boozId: PropTypes.string.isRequired,
  drinkName: PropTypes.string,
  mainAlcohol: PropTypes.string,
  ingredients: PropTypes.string,
  preparation: PropTypes.string,
  drinkWare: PropTypes.string,
  served: PropTypes.string,
  garnish: PropTypes.string
};

const mapStateToProps = state => ({
  boozula: state.data.boozula,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { editBoozDetails }
)(withStyles(styles)(EditBoozDetails));
