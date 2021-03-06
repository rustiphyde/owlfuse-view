import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Components
import Spark from "../components/sparks/Spark";
import Fuser from "../components/fuses/Fuser";
import Candle from "../components/Candle";
import SparkSkeleton from "../util/SparkSkeleton";
import Toggle from "../components/Toggle";
import FuseRequest from "../components/fuses/FuseRequest";
import SentRequest from "../components/fuses/SentRequest";
import PostSpark from "../components/sparks/PostSpark";// Icons
import FlameIcon from "../components/icons/FlameIcon";

// MUI Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Redux
import { connect } from "react-redux";
import {
	getSparks,
	getInfernals,
	getFusers,
	fetchRequestedFuses,
	getAllSentFuses
} from "../redux/actions/dataActions";

const styles = {
	toggleIsActive: {
		color: "#ff9800 !important"
	},
	toggleIsInactive: {
		color: "#263238 !important"
	}
};

class home extends Component {
	// Initialize Component State for storing the Sparks
	state = {
		sparks: null,
		toggleChecked: false,
		toggleFuse: false,
		fusers: null,
		fuserequests: null,
		sentrequests: null,
		boozulas: null
	};

	toggleFunx = () => {};

	componentDidMount() {
		this.props.getSparks();
		this.props.getInfernals();
		this.props.getFusers();
		this.props.fetchRequestedFuses();
		this.props.getAllSentFuses();
	}

	handleToggle = event => {
		if (event.target.checked) {
			this.setState({ toggleChecked: true });
		} else {
			this.setState({ toggleChecked: false });
		}
	};

	handleToggleFuse = event => {
		if (event.target.checked) {
			this.setState({ toggleFuse: true });
		} else {
			this.setState({ toggleFuse: false });
		}
	};
	render() {
		const { classes } = this.props;
		const {
			fusers,
			sparks,
			infernals,
			loading,
			fuserequests,
			sentrequests
		} = this.props.data;
		const {
			user: { authenticated,
				credentials: { clozang }
			}
		} = this.props;

		let recentSparksMarkup = authenticated ? (
			!loading && sparks ? (
				!this.state.toggleChecked ? (
					sparks.filter(filt => filt.userClozang === clozang).length > 0 ? (
						sparks
							.filter(filt => filt.userClozang === clozang)
							.map(spark => <Spark key={spark.sparkId} spark={spark} />)
					) : (
						<Fragment>
							<div className="candle centered" width="100%">
							<strong className="post-text">
								SPARK AN INTEREST
							</strong>
							<PostSpark className="icon"/>
							</div>
						</Fragment>
					)
				) : (
					infernals.filter(filt => filt.userClozang === clozang).length > 0 ? (
						infernals
							.filter(filt => filt.userClozang === clozang)
							.map(spark => <Spark key={spark.sparkId} spark={spark} />)
					) : (
						<Fragment>
							<div className="candle centered" width="100%">
							<strong className="post-text">
								POST A SPARK
							</strong>
							<PostSpark className="icon"/>
							</div>
						</Fragment>
					)
			)) : (
				<SparkSkeleton length={6} />
			)
		) : (<strong className="candle centered">Please Login</strong>);

		

		let fusersMarkup = authenticated ? (
			!loading && fusers ? (
				fusers && fusers.length > 1 && fusers !== [] && fusers !== null ? (
					fusers
						.filter(fuse => fusers.indexOf(fuse) !== 0)
						.map(fuser => <Fuser key={fusers.indexOf(fuser)} fuser={fuser} />)
				) : (
					<div className="rusty">
						You are not currently fused with anyone...get out there and mingle!!
					</div>
				)
			) : (
				<div>Loading...</div>
			)) : (<strong className="centered">You are not currently logged in</strong>
		);
		let requestsMarkup = !loading ? (
			!this.state.toggleFuse ? (
				sentrequests &&
				sentrequests.length > 0 &&
				sentrequests !== [] &&
				sentrequests !== null &&
				sentrequests !== undefined &&
				sentrequests !== "" ? (
					<Fragment>
						{sentrequests.map(sentrequest => (
							<SentRequest key={sentrequest.reqId} sentrequest={sentrequest} />
						))}{" "}
					</Fragment>
				) : (
					<div className="rusty">
						You do not currently have any fuse requests sent out
					</div>
				)
			) : fuserequests &&
			  fuserequests.length > 0 &&
			  fuserequests !== null &&
			  fuserequests !== undefined &&
			  fuserequests !== "" ? (
				<Fragment>
					{fuserequests.map(fuserequest => (
						<FuseRequest key={fuserequest.reqId} fuserequest={fuserequest} />
					))}{" "}
				</Fragment>
			) : (
				<div className="rusty">
					You do not currently have any fuse requests, check back later
				</div>
			)
		) : (
			<div>Loading...</div>
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={6} xs={12}>
					<div className="candle" width="100%">
						<FlameIcon className="icon7" />
					</div>

					<Candle />
					<br />
					<div className="sparkTitle">
						<strong>FUSEBOX</strong>
						<hr className="bar-separator" />
					</div>
					<div className="candle" width="100%">
						{fusersMarkup}
					</div>
					<div className="sparkTitle">
						<strong>FUSE REQUESTS</strong>
						<hr className="bar-separator" />
					</div>
					<div className="centered">
						<span
							className={`toggle-text ${
								!this.state.toggleFuse
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Sent By You
						</span>
						<Toggle toggleFunx={this.handleToggleFuse} />
						<span
							className={`toggle-text ${
								this.state.toggleFuse
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Sent To You
						</span>
					</div>
					<div className="candle">{requestsMarkup}</div>
				</Grid>
				<Grid item sm={6} xs={12}>
					<div className="centered">
						<span
							className={`toggle-text ${
								!this.state.toggleChecked
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Most Recent
						</span>
						<Toggle toggleFunx={this.handleToggle} />
						<span
							className={`toggle-text ${
								this.state.toggleChecked
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Most Heat
						</span>
					</div>
					<div className="sparkTitle">
						<strong>YOUR SPARKS</strong>
						<hr className="bar-separator" />
					</div>
					{recentSparksMarkup}
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	getFusers: PropTypes.func.isRequired,
	getSparks: PropTypes.func.isRequired,
	getInfernals: PropTypes.func.isRequired,
	fetchRequestedFuses: PropTypes.func.isRequired,
	getAllSentFuses: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data,
	user: state.user
});

export default connect(mapStateToProps, {
	getSparks,
	getInfernals,
	getFusers,
	fetchRequestedFuses,
	getAllSentFuses
})(withStyles(styles)(home));
