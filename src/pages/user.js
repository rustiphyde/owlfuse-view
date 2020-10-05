import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Components
import Spark from "../components/sparks/Spark";
import StaticProfile from "../components/StaticProfile";
import SparkSkeleton from "../util/SparkSkeleton";
import CandleSkeleton from "../util/CandleSkeleton";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Icons
import FlameIcon from "../components/icons/FlameIcon";

// Redux
import { connect } from "react-redux";
import { getSparks } from "../redux/actions/dataActions";

class user extends Component {
	state = {
		profile: null,
		sparkIdParam: null,
	};
	componentDidMount() {
		const clozang = this.props.match.params.clozang;
		const sparkId = this.props.match.params.sparkId;

		if (sparkId) this.setState({ sparkIdParam: sparkId });

		this.props.getSparks();
		axios
			.get(`/user/${clozang}`)
			.then((res) => {
				this.setState({
					profile: res.data.user,
				});
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { clozang: username } = this.props;
		const { sparks, loading } = this.props.data;
		const { sparkIdParam } = this.state;

		let sparksMarkup =
			sparks === null || sparks.length === 0 ? (
				<strong className="center">
					This user has not lit any sparks yet.
				</strong>
			) : !sparkIdParam ? (
				sparks.map((spark) => {
					if (spark.userClozang === this.props.match.params.clozang) {
						return <Spark key={spark.sparkId} spark={spark} />;
					}
				})
			) : (
				sparks.map((spark) => {
					if (spark.userClozang === this.props.match.params.clozang) {
						if (spark.sparkId !== sparkIdParam)
							return <Spark key={spark.sparkId} spark={spark} />;
						else
							return (
								<Spark key={spark.sparkId} spark={spark} openDialog={true} />
							);
					}
				})
			);

		return loading ? (
			<Grid container spacing={2}>
				<Grid item sm={4} xs={12}>
					<div className="sparkTitle">
						<strong>CANDLE</strong>
						<hr className="bar-separator" />
					</div>
					<div className="candle" width="100%">
						<FlameIcon className="icon7" />
					</div>
					<CandleSkeleton />
				</Grid>
				<Grid item sm={8} xs={12}>
					<div className="sparkTitle">
						<strong>SPARKS</strong>
						<hr className="bar-separator" />
					</div>
					<SparkSkeleton length={2} />
				</Grid>
			</Grid>
		) : this.state.profile !== null && !loading ? (
			<Grid container spacing={2}>
				<Grid item sm={4} xs={12}>
					<div className="sparkTitle">
						<strong>CANDLE</strong>
						<hr className="bar-separator" />
					</div>
					<div className="candle" width="100%">
						<FlameIcon className="icon7" />
					</div>
					<StaticProfile profile={this.state.profile} username={username} />
				</Grid>
				<Grid item sm={8} xs={12}>
					<div className="sparkTitle">
						<strong>SPARKS</strong>
						<hr className="bar-separator" />
					</div>
					{sparksMarkup}
				</Grid>
			</Grid>
		) : this.props.match.params.clozang.split("")[0] === ">" ? (
			<Grid container spacing={2}>
				<Grid item sm={4} xs={12}>
					<div className="sparkTitle">
						<strong>CANDLE</strong>
						<hr className="bar-separator" />
					</div>
					<div className="candle" width="100%">
						<FlameIcon className="icon7" />
					</div>
					<CandleSkeleton />
				</Grid>
				<Grid item sm={8} xs={12}>
					<div className="sparkTitle">
						<strong>SPARKS</strong>
						<hr className="bar-separator" />
					</div>
					<SparkSkeleton length={2} />
				</Grid>
			</Grid>
		) : (
			<Grid container spacing={2}>
				<div className="sparkTitle centered">
					<strong>404 Page Not Found</strong>
					<hr className="bar-separator" />
				</div>
			</Grid>
		);
	}
}

user.propTypes = {
	getSparks: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
	clozang: state.user.credentials.clozang,
	UI: state.UI,
});

export default connect(mapStateToProps, { getSparks })(user);
