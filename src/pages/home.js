import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import Spark from "../components/sparks/Spark";
import Fuser from "../components/fuses/Fuser";
import Candle from "../components/Candle";
import SparkSkeleton from "../util/SparkSkeleton";
import Toggle from "../components/Toggle";
import FuseRequest from "../components/fuses/FuseRequest";
import SentRequest from "../components/fuses/SentRequest";

// Icons
import FlameIcon from "../components/icons/FlameIcon";
import OwlFuseLogo from "../components/icons/OwlFuseLogo";

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

class home extends Component {
	// Initialize Component State for storing the Sparks
	state = {
		sparks: null,
		toggleChecked: false,
		toggleFuse: false,
		fusers: null,
		fuserequests: null,
		sentrequests: null
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
			console.log("toggle is checked");
		} else {
			this.setState({ toggleChecked: false });
			console.log("toggle is not checked");
		}
	};

	handleToggleFuse = event => {
		if (event.target.checked) {
			this.setState({ toggleFuse: true });
			console.log("toggle is checked");
		} else {
			this.setState({ toggleFuse: false });
			console.log("toggle is not checked");
		}
	};
	render() {
		const {
			fusers,
			sparks,
			infernals,
			loading,
			fuserequests,
			sentrequests
		} = this.props.data;

		let recentSparksMarkup = !loading ? (
			!this.state.toggleChecked ? (
				sparks.map(spark => <Spark key={spark.sparkId} spark={spark} />)
			) : (
				infernals.map(infernal => (
					<Spark key={infernal.sparkId} spark={infernal} />
				))
			)
		) : (
			<SparkSkeleton length={6} />
		);
		let fusersMarkup = !loading ? (
			!this.state.toggleFuse ? (
				fusers && fusers.length > 1 && fusers !== [] && fusers !== null ? (
					fusers
						.filter(fuse => fusers.indexOf(fuse) !== 0)
						.map(fuser => <Fuser key={fusers.indexOf(fuser)} fuser={fuser} />)
				) : (
					<div className="rusty">
						You are not currently fused with anyone...get out there and mingle!!
					</div>
				)
			) : fuserequests && fuserequests.length > 0 && fuserequests !== null && fuserequests !== undefined && fuserequests !== "" ? (
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
		let sentMarkup = !loading ? (
			sentrequests && sentrequests.length > 0 && sentrequests !== [] && sentrequests !== null && sentrequests !== undefined && sentrequests !== "" ? (
				<Fragment>
					{sentrequests.map(sentrequest => (<SentRequest key={sentrequest.reqId} sentrequest={sentrequest} /> ))}{" "}
				</Fragment>
			) : (
				<div className="rusty">
					You do not currently have any fuse requests sent out
				</div>
			)
		) : (<div>Loading...</div>);
		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					<div className="centered">
						<span className="toggle-text toggle-is--active">Most Recent</span>
						<Toggle toggleFunx={this.handleToggle} />
						<span className="toggle-text">Scorch Rank</span>
					</div>
					<div className="sparkTitle">
						<strong>SPARKS</strong>
						<hr className="bar-separator" />
					</div>
					{recentSparksMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<div className="sparkTitle">
						<strong>CANDLE</strong>
						<hr className="bar-separator" />
					</div>
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
						<OwlFuseLogo className="icon7" />
						{fusersMarkup}
					</div>
          <div className="centered">
						<span className="toggle-text toggle-is--active">Fusers</span>
						<Toggle toggleFunx={this.handleToggleFuse} />
						<span className="toggle-text">Requests</span>
					</div>
					<div className="sparkTitle">
						<strong>SENT BY YOU</strong>
						<hr className="bar-separator" />
					</div>
					<div className="candle">
						{sentMarkup}
					</div>
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
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, {
	getSparks,
	getInfernals,
	getFusers,
	fetchRequestedFuses,
	getAllSentFuses
})(home);
