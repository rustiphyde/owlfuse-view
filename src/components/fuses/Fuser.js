import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SilentToggle from "../SilentToggle";
import SilentChecked from "../SilentChecked";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

import { fetchSilencedList, unsilenceFuser } from "../../redux/actions/dataActions";

const styles = {
	paper: {
		backgroundColor: "#263238",
		color: "#f4db9d",
		height: "3rem",
		borderRadius: "16px 0 16px 0",
		padding: "16px",
		margin: "6px",
		overflow: "hidden",
		"&:hover": {
			color: "#f4db9d !important"
		}
	}
};

class Fuser extends Component {
	state = {
		silenced: null,
		toggleChecked: false
	};

	componentDidMount() {
		this.props.fetchSilencedList();
	}

	handleToggleSilence = (event) => {
		if (event.target.checked) {
			this.setState({ toggleChecked: true });
		} else {
			this.setState({
				toggleChecked: false
            });
            this.props.unsilenceFuser(this.props.fuser);
            setTimeout(() => this.props.fetchSilencedList(), 2000);
        
        }
        console.log(this.state.toggleChecked)
	};

	render() {
		const { classes, fuser, silenced, loading } = this.props;

		let toggleMarkup = !loading ? (
			silenced &&
			silenced !== null &&
			silenced.length > 0 &&
			silenced !== [] &&
			silenced !== "" &&
			silenced.includes(fuser) ? (
                <Tooltip title="Unsilence This Fuser">
				<div className="centered silentToggle">					
						<SilentChecked
							toggleFunx={this.handleToggleSilence}
							className="silentToggle"
						/>
					</div>
				</Tooltip>
			) : (
                <Tooltip title="Silence This Fuser">
				<div className="centered silentToggle">
					
						<SilentToggle
							toggleFunx={this.handleToggleSilence}
							className="silentToggle"
						/>
					
				</div>
                </Tooltip>
			)
		) : (
			<div>Loading...</div>
		);
		return (
			<Paper className={classes.paper}>
				<Typography
					variant="h6"
					component={Link}
					className="foam orange"
					to={`/${fuser}`}
				>
					<strong>{fuser}</strong>
				</Typography>
				{toggleMarkup}
				<hr className="bar-separator" />
			</Paper>
		);
	}
}

Fuser.propTypes = {
	classes: PropTypes.object.isRequired,
	fuser: PropTypes.string.isRequired,
	silenced: PropTypes.array.isRequired,
	fetchSilencedList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
    unsilenceFuser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	silenced: state.data.silenced,
	loading: state.data.loading
});

const mapActionsToProps = {
    fetchSilencedList,
    unsilenceFuser
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Fuser));
