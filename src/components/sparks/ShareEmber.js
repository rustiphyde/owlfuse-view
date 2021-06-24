import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { getSpark, shareEmber, getSparks } from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import {
	CircularProgress,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Dialog,
	Paper,
	Typography,
	Grid,
} from "@material-ui/core";
import EmberIcon from "../icons/EmberIcon";
import CloseIcon from "../icons/CloseIcon";

const styles = (theme) => ({
	...theme.themeMinusPalette,
	textField: {
		textAlign: "center",
    },
	dialogContent: {
		padding: 20,
		color: "#ff9800",
		overflowY: "auto",
		overflowX: "hidden",
		backgroundColor: "primary",
	},
	closeButton: {
		position: "absolute",
		left: "82%",
		top: "2%",
	},
	submitButton: {
		position: "relative",
		margin: "10px auto",
	},
	progressSpinner: {
		position: "absolute",
	},
	spimg: {
		width: "100%",
		objectFit: "cover",
		marginTop: "16px",
    },
    shareForm: {
        textAlign: 'left !important'
    }
});

class ShareEmber extends Component {
	state = {
		open: false,
		body: "",
	};

	componentDidMount() {
		this.props.getSpark(this.props.emberId);
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
        this.props.shareEmber(this.props.emberId, { body: this.state.body });
        setTimeout(this.props.getSparks, 5000);
        this.handleClose();

	};

	render() {
		const {
			classes,
			spark: {
				userClozang,
				body,
				createdAt,
				sparkImage,
				sparkVideo,
				sparkAudio,
				sparkLink,
			},
			UI: { loading },
		} = this.props;

		let emberContent = sparkImage ? (
			<Fragment>
				<img src={sparkImage} alt="spark image" className={classes.spimg} />
				<br />
			</Fragment>
		) : sparkVideo ? (
			<Fragment>
				<div className="vid-cont" style={{textAlign: 'center', marginTop: '16px', position: 'relative', height: 0, paddingBottom: '56.25%', width: '100%' }}>
				<iframe
					src={sparkVideo}
					allowFullScreen
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%'
					}}
				></iframe>
				</div>
				<br />
			</Fragment>
		) : sparkAudio ? (
			<Fragment>
				<hr className="bar-separator" />
				<div id="aPlayer" className="centered">
					<audio
						controls
						style={{ backgroundColor: "transparent", outline: "none" }}
					>
						<source
							style={{
								backgroundColor: "#ff9800",
								borderRadius: "16px 0 16px 0",
							}}
							src={sparkAudio}
						></source>
					</audio>
				</div>
				<hr className="bar-separator" />
			</Fragment>
		) : null;

		return (
			<Fragment>
				<OwlFuseButton tip="SHARE AN EMBER" onClick={this.handleOpen}>
					<EmberIcon color="primary" className="icon6 orange" />
				</OwlFuseButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth fullScreen>
					<OwlFuseButton
						tip="CLOSE"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon className="orange" />
					</OwlFuseButton>
					<DialogTitle variant="h5" className="orng">
						SHARE AN EMBER
					</DialogTitle>
					<DialogContent className="orange-border">
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="ADD TEXT"
								multiline
								rows="2"
								placeholder="SPARK IT"
								className={`${this.props.classes.textField} ${this.props.classes.displayLinebreaks}`}
								onChange={this.handleChange}
								fullWidth
							/>
							<hr className="bar-separator" />
							<span className={classes.shareForm}>
								<Typography variant="body2" color="primary">
									<strong>{userClozang} </strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									{dayjs(createdAt).format("h:mm a, MMMM D, YYYY")}
								</Typography>
							<Typography variant="body2" color="primary" className="breaks">
								<b>{body}</b>
							</Typography>
                            </span>
                            {emberContent}
                            <hr className="bar-separator" />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								SHARE
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

ShareEmber.propTypes = {
	shareEmber: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	getSpark: PropTypes.func.isRequired,
	emberId: PropTypes.string.isRequired,
    spark: PropTypes.object.isRequired,
    getSparks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps, { getSpark, shareEmber, getSparks })(
	withStyles(styles)(ShareEmber)
);
