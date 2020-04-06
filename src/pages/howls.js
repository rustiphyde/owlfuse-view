import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchUserHowls } from "../redux/actions/dataActions";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import HowlIcon from "../components/icons/HowlIcon";

const styles = {
	titleBar: {
		display: "flex",
		backgroundColor: "#263238",
		color: "#ff9800",
		paddingLeft: "3rem",
		width: "100%",
	},
	back: {
		marginTop: "-3.5rem",
        backgroundColor: "#263238",
        width: '100%'
	},
};

class howls extends Component {
	state = {
		howls: null,
	};

	componentDidMount() {
		this.props.fetchUserHowls();
	}

	render() {
		const { classes } = this.props;
		const { howls } = this.props.data;

		return (
			<Grid container spacing={1}>
				<Grid item sm={12} className={classes.back}>
					<Fragment>
						<hr className="bar-separator" />
						<div className="centered">
							<span className={classes.titleBar}>
								<HowlIcon className="icon5" />
								<Typography variant="h3" lassName={classes.title}>
									<strong c>HOWLBOX</strong>
								</Typography>
							</span>
						</div>
					</Fragment>
				</Grid>
				<Grid item sm={4}>
					<Fragment>
						<div>Hello</div>
					</Fragment>
				</Grid>
				<Grid item sm={8}>
					<Fragment>
                        <div>Howls Go Here</div>
                    </Fragment>
				</Grid>
			</Grid>
		);
	}
}

howls.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	fetchUserHowls: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	data: state.data,
});

const mapActionsToProps = {
	fetchUserHowls,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(howls));
