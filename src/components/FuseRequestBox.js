import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FuseRequest from "./FuseRequest";
import OwlFuseButton from "../util/OwlFuseButton";
import { connect } from "react-redux";
import { fetchRequestedFuses } from "../redux/actions/dataActions";

// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const styles = {};

class FuseRequestBox extends Component {
    state = {
        fuserequests: null,
        open: false

    }
    componentDidMount(){
        this.props.fetchRequestedFuses();
    }
	render() {
		const {
            classes,
            fuserequests,
			UI: { loading },
			user: { clozang, authenticated }
        } = this.props;
        const requestsMarkup = !loading ? (authenticated && fuserequests ? (
            fuserequests.map(fuserequest => <FuseRequest key={fuserequest.reqId} fuserequest={fuserequest}/>) ) : (<div>Nothing to see here people...</div>)
        ) : (<CircularProgress className={classes.progress} />)
		return <div>{requestsMarkup}</div>;
	}
}

FuseRequestBox.propTypes = {
	fetchRequestedFuses: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    fuserequests: PropTypes.array
};

const mapStateToProps = state => ({
	user: state.user,
	fuserequests: state.data.fuserequests,
	UI: state.UI
});

const mapActionsToProps = {
	fetchRequestedFuses
};
export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(FuseRequestBox));
