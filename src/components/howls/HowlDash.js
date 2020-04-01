import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import OwlFuseButton from "../../util/OwlFuseButton";

import { fetchUserHowls } from "../../redux/actions/dataActions";

//MUI Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import HowlIcon from "../icons/HowlIcon";

const styles = {
	dash: {
		backgroundColor: "#263238 !important",
		color: "#ff9800 !important",
		fontFamily: '"Baloo", cursive !important'
    },
    menuBox: {
        width: '600px !important'
    }
};

class HowlDash extends Component {
	state = {
		howls: null,
		anchorEl: null
	};

	componentDidMount() {
		this.props.fetchUserHowls();
    }
    
    handleOpen = event => {
        this.setState({ anchorEl: event.target });
      };
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

	handleHowl = (docKey) => {
		console.log(docKey);
	};

	render() {
		const {
			classes,
			howls,
			user: { clozang }
        } = this.props;
        const anchorEl = this.state.anchorEl;

		let howlsMarkup =
			howls &&
			howls.length > 0 &&
			howls !== "" &&
			howls !== [] &&
			howls !== undefined &&
			howls !== null ? (
				howls.map(howl => (
					<MenuItem
						key={howl.docKey}
					>
						<Typography>
							{howl.howlers.filter(howler => howler !== clozang)[0]}
						</Typography>
					</MenuItem>
				))
			) : (
				<div>You do not have any active howls at this time</div>
			);

		return (
			<Fragment>
				<OwlFuseButton tip="OPEN HOWL MENU" onClick={this.handleOpen}>
					<HowlIcon className="foam orange icon15" />
				</OwlFuseButton>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    className={classes.menuBox}
                    stylele={{ width: "600px" }}
				>
					{howlsMarkup}
				</Menu>
			</Fragment>
		);
	}
}

HowlDash.propTypes = {
	classes: PropTypes.object.isRequired,
	fetchUserHowls: PropTypes.func.isRequired,
	howls: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};

const mapActionsToProps = {
	fetchUserHowls
};

const mapStateToProps = state => ({
	howls: state.data.howls,
	user: state.user
});

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(HowlDash));
