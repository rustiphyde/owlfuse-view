import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditBoozulaImageIcon from "../icons/EditBoozulaImageIcon";
import OwlFuseButton from "../../util/OwlFuseButton";
import { uploadBoozImage } from "../../redux/actions/dataActions";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



const styles = {

}

class EditBoozulaImage extends Component {
state = {
    open: false
};
handleOpen = () => {
        this.setState({ open: true });
}
handleClose = () => {
            this.setState({ open: false });
}
handleImageChange = event => {
    const { boozId } = this.props;
    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadBoozImage(this.props.boozId, formData);
    console.log(boozId);
    this.handleClose();
  };
handleEditPicture = () => {
    const fileInput = document.getElementById("boozImageInput");
    fileInput.click();
  };
render() {
      const { classes } = this.props;
    return (
        <Fragment>
       <OwlFuseButton
          tip="EDIT BOOZULA IMAGE"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditBoozulaImageIcon color="primary" className="icon6" />
        </OwlFuseButton>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxwidth="sm"
          className={classes.dialog}
        >
          <DialogTitle variant="h5" className={classes.title}>
            EDIT YOUR IMAGE
          </DialogTitle>
          <DialogContent>
            <form className={classes.form}>
            <div>
        <input
          type="file"
          id="boozImageInput"
          hidden="hidden"
          onChange={this.handleImageChange}
        />
        <OwlFuseButton
          tip="EDIT BOOZULA IMAGE"
          onClick={this.handleEditPicture}
          className={classes.button}
        >
          <EditBoozulaImageIcon color="primary" className="icon" />
        </OwlFuseButton>
        </div>
        </form>
        </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  };
}

EditBoozulaImage.propTypes = {
  uploadBoozImage: PropTypes.func.isRequired,
  boozId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boozula: state.data.boozula,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { uploadBoozImage }
)(withStyles(styles)(EditBoozulaImage));
