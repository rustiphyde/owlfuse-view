import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { connect } from 'react-redux';
import FuseButton from "./fuses/FuseButton";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Components

// Icons
import LocationIcon from "./icons/LocationIcon";
import CandleIcon from "./icons/CandleIcon";
import LinkIcon from "./icons/LinkIcon";

// Utils
import OwlFuseButton from "../util/OwlFuseButton";

const styles = theme => ({
	paper: {
		padding: 16,
		borderRadius: "16px 0 16px 0",
		borderTop: "2px solid #ff9800",
		borderBottom: "2px solid #ff9800",
		borderLeft: "2px solid #ff9800",
		backgroundColor: "#263238"
	},
	candle: {
		margin: 8,
		borderTop: "2px solid #ff9800",
		borderBottom: "2px solid #ff9800",
		borderRight: "2px solid #ff9800",
		backgroundColor: "#fff",
		borderRadius: "16px 0 16px 0",
		"& .image-wrapper": {
			textAlign: "center",
			position: "relative"
		},
		"& .candle-image": {
			border: "2px solid #ff9800",
			width: 160,
			height: 160,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "50%",
			margin: 8
		},
		"& .candle-details": {
			margin: 8,
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle"
			}
		},
		"& hr": {
			border: "none",
			margin: "0 0 10px 0"
		}
	},
	joined: {
		color: "#ff9800"
	}
});

const StaticProfile = props => {
	const {
		classes,
		profile: { clozang, createdAt, imageUrl, bio, website, location },
		username
	} = props;

	return (
		<Paper className={classes.paper}>
			<div className={classes.candle}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="candle" className="candle-image" />
				</div>
				<div className="candle" width="100%">
					{clozang !== username ? <FuseButton fuser={clozang} clozang={username}/> : null}
				</div>

				<hr />

				<div className="candle-details">
					<MuiLink
						component={Link}
						to={`/${clozang}`}
						color="primary"
						variant="h5"
					>
						<strong>{clozang}</strong>
					</MuiLink>
					<hr />
					{bio && (
						<Typography variant="body2">
							<strong>{bio}</strong>
						</Typography>
					)}
					<hr />
					{location && (
						<Fragment>
							<LocationIcon color="secondary" className="icon" />{" "}
							<Typography variant="body2">
								<b>{location}</b>
							</Typography>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<a href={website} target="_blank" rel="noopener noreferrer">
								{" "}
								<OwlFuseButton tip={`${website}`}>
									<LinkIcon className="icon orange" color="primary" />
								</OwlFuseButton>
							</a>
							<hr />
						</Fragment>
					)}
					<CandleIcon color="secondary" className="icon" />
					<Typography variant="body2">
						<strong>
							Candle was ignited in {dayjs(createdAt).format("MMMM")} of{" "}
							{dayjs(createdAt).format("YYYY")}
						</strong>
					</Typography>
				</div>
			</div>
		</Paper>
	);
};
StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(StaticProfile));
