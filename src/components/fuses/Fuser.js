import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SilentToggle from "../SilentToggle";
import SilentChecked from "../SilentChecked";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

import FusePanel from '../FusePanel';
import HowlBox from '../howls/HowlBox';

import { fetchSilencedList, unsilenceFuser, silenceFuser } from "../../redux/actions/dataActions";

const styles = {
	paper: {
		position: 'relative',
		backgroundColor: "#263238",
		color: "#f4db9d",
		height: "3rem",
		borderRadius: "16px 0 0 0",
		padding: "16px",
		margin: "6px 6px 1px 6px ",
		overflow: "hidden",
		"&:hover": {
			color: "#f4db9d !important"
		}
	},
	paper2: {
		position: 'relative',
		backgroundColor: "#263238",
		color: "#f4db9d",
		height: "3rem",
		borderRadius: "0 0 16px 0",
		padding: "16px",
		margin: "0 6px 6px 6px",
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
            this.props.silenceFuser(this.props.fuser);
            setTimeout(() => this.props.fetchSilencedList(), 500);
		} else {
			this.setState({
				toggleChecked: false
            });
            this.props.unsilenceFuser(this.props.fuser);
            setTimeout(() => this.props.fetchSilencedList(), 500);
        
        }
        console.log(this.state.toggleChecked)
	};

	render() {
		const { classes, fuser, silenced, loading } = this.props;

		let toggleMarkup = !loading ? (
			silenced &&
			silenced !== null &&
			silenced.length > 1 &&
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
			<Fragment>
			<Paper className={classes.paper}>
				<Typography
					variant="h6"
					component={Link}
					className="foam orange"
					to={`/${fuser}`}
				>
					<strong>{fuser}</strong>

				</Typography>

			</Paper>
			<Paper className={classes.paper2}>
				<FusePanel/>
				<HowlBox docKey={[this.props.fuser, this.props.user.credentials.clozang].sort().join("::")} fuser={fuser}/>
				{toggleMarkup}
			</Paper>
			<hr className="bar-separator" />
		</Fragment>
		);
	}
}

Fuser.propTypes = {
	classes: PropTypes.object.isRequired,
	fuser: PropTypes.string.isRequired,
	silenced: PropTypes.array.isRequired,
	fetchSilencedList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
    unsilenceFuser: PropTypes.func.isRequired,
	silenceFuser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	silenced: state.data.silenced,
	loading: state.data.loading,
	user: state.user
});

const mapActionsToProps = {
    fetchSilencedList,
    unsilenceFuser,
    silenceFuser
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Fuser));
