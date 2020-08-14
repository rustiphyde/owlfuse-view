import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OwlFuseButton from "../../util/OwlFuseButton";
import CloseIcon from "../icons/CloseIcon";
import { withStyles } from "@material-ui/core/styles";
import AddImageIcon from "../icons/AddImageIcon";
import { addSparkImage } from "../../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
	...theme.themeMinusPalette,
	submitButton: {
		position: "relative",
		margin: "10px auto",
	},
	progressSpinner: {
		position: "absolute",
	},
	closeButton: {
		position: "absolute",
		left: "80%",
		top: "4%",
		color: "#f4db9d",
	},
	textField: {
		textAlign: "center",
	},
});

class SparkImage extends Component {
	state = {
		open: false,
		body: "",
	};

	formData = new FormData();

	openImageSpark = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	handleImageAdd = (event) => {
		const image = event.target.files[0];
		this.formData.append("image", image, image.name);
	};
	handleAddImage = () => {
		const fileInput = document.getElementById("sparkImageInput");
		fileInput.click();
	};
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		this.formData.append("body", this.state.body);
		this.props.addSparkImage(this.formData);
		this.handleClose();
		this.props.closeFunx();
	};

	render() {
		const { classes,  UI: { loading } } = this.props;

		return (
			<Fragment>
				<OwlFuseButton tip="IMAGE SPARK" onClick={this.openImageSpark}>
					<AddImageIcon className="oaky orange icon5" />
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
					><CloseIcon className="orange"/>
                    </OwlFuseButton>
                    <DialogTitle variant="h5" className="orng">POST AN IMAGE SPARK</DialogTitle>
                    <DialogContent className="orange-border">
					<form onSubmit={this.handleSubmit}>
                    <input
						type="file"
						id="sparkImageInput"
						hidden="hidden"
						onChange={this.handleImageAdd}
					/>
                    <TextField
                name="body"
                type="text"
                label="CAPTION YOUR SPARK IMAGE"
                multiline
                rows="3"
                placeholder="CAPTION IT"
                className={`${this.props.classes.textField} ${this.props.classes.displayLinebreaks}`}
                onChange={this.handleChange}
                fullWidth
              />
              <OwlFuseButton tip="IMAGE SPARK" onClick={this.handleAddImage}>
						<AddImageIcon className="oaky orange icon5" />
					</OwlFuseButton>
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
                    <DialogActions>
          <Button onClick={this.handleClose} color="primary" variant="contained">
              <strong className="orange">CANCEL</strong>
            </Button>
          </DialogActions>
                    </DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

SparkImage.propTypes = {
    addSparkImage: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	closeFunx: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
	data: state.data,
	auth: state.firebase.auth,
});

const mapActionsToProps = {
	addSparkImage,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(SparkImage));
