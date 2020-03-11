import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import OwlFuseButton from "../../util/OwlFuseButton";
import { withStyles } from "@material-ui/core/styles";
import {
	sendFuseRequest,
	clearSuccess,
    clearErrors,
    getFusers
} from "../../redux/actions/dataActions";
import { connect } from "react-redux";

// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import FuseRequestIcon from "../icons/FuseRequestIcon";

const styles = {
	fuseWith: {}
};

class FuseButton extends Component {
	state = {
		open: false,
		success: {},
		errors: {},
        messageOpen: false,
        fusers: null
    };
    componentDidMount(){
        this.props.getFusers();
      }
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.success && !nextProps.UI.errors) {
			this.setState({ success: nextProps.UI.success });
			this.setState({ errors: {} });
		}
		if (nextProps.UI.errors && !nextProps.UI.success) {
			this.setState({ errors: nextProps.UI.errors });
			this.setState({ success: {} });
		}
	}
	handleOpen = () => {
		this.setState({ open: true });
		console.log(this.props.fuser + "&" + this.props.user.clozang)
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleMessageOpen = () => {
		this.setState({ messageOpen: true });
		this.setState({ success: this.state.success });
		this.setState({ errors: this.state.errors });
	};
	handleMessageClose = () => {
		this.setState({ messageOpen: false });
		this.setState({ success: {} });
		this.setState({ errors: {} });
		this.props.clearSuccess();
		this.props.clearErrors();
	};
	sendFuseRequest = () => {
		this.props.sendFuseRequest(this.props.fuser);
		this.setState({ open: false });
		this.handleMessageOpen();
	};
	render() {
		const {
            classes,
            fusers,
			user: { authenticated },
			clozang,
			UI: { loading },
			fuser
        } = this.props;
        const { errors, success } = this.state;
		const dialogMarkup = loading ? (
			<CircularProgress className={classes.progress} />
		) : (
			<Fragment>
				{success.message ? (
					<DialogTitle variant="h5" className="rusty oke-border">
						{success.message}
					</DialogTitle>
				) : (
					<DialogTitle variant="h5" className="rusty oke-border">
						{errors.error}
					</DialogTitle>
				)}
				<DialogActions>
					<Button
						onClick={this.handleMessageClose}
						color="primary"
						variant="contained"
					>
						OK
					</Button>
				</DialogActions>
			</Fragment>
        );
        const authButton = !loading && authenticated && fuser !== clozang && !this.props.fusers.includes(this.props.fuser) ? (
            <Fragment>
               	<OwlFuseButton
					tip="SEND FUSE REQUEST"
					onClick={this.handleOpen}
					btnClassName={classes.fuseWith}
				>
					
            <FuseRequestIcon className="icon2 orange foam"/>

				</OwlFuseButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle variant="h5" className="orng">
						Do you wish to send a Fuse request to this OwlFuser?.
					</DialogTitle>
					<DialogActions>
						<Button
							onClick={this.handleClose}
							color="primary"
							variant="contained"
						>
							CANCEL
						</Button>
						<Button
							onClick={this.sendFuseRequest}
							color="primary"
							variant="contained"
						>
							FUSE
						</Button>
					</DialogActions>
				</Dialog>
				<hr />
				<Dialog
					open={this.state.messageOpen}
					onClose={this.handleMessageClose}
					fullWidth maxWidth="sm" className="container">
                        {dialogMarkup}
				</Dialog>
			</Fragment>) : null;
		return authButton;
	}
}

FuseButton.propTypes = {
	sendFuseRequest: PropTypes.func.isRequired,
	fuser: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	clearSuccess: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getFusers: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	clozang: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
    UI: state.UI,
	fusers: state.data.fusers,
	clozang: state.user.credentials.clozang
});

const mapActionsToProps = {
	sendFuseRequest,
	clearSuccess,
    clearErrors,
    getFusers
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(FuseButton));


//TODO : Create function to remove FuseButton when on current user