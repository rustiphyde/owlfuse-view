import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// Components
import ExtinguishSpark from "./ExtinguishSpark";
import SparkBox from "./SparkBox";
import HeatButton from "./HeatButton";
import ShareEmber from "./ShareEmber";


// Icons
import FireIcon from "../icons/FireIcon";
import InfernalIcon from "../icons/InfernalIcon";
import EmberIcon from "../icons/EmberIcon";

// Redux
import { connect } from "react-redux";
import {
	addHeat,
	removeHeat
} from "../../redux/actions/dataActions";
import OwlFuseButton from "../../util/OwlFuseButton";

const styles = {
	card: {
		// maxWidth: '98vw',
		position: "relative",
		display: "flex",
		marginBottom: 8,
		borderRadius: "16px 0 16px 0",
		backgroundColor: "#263238",
	},
	content: {
		padding: 25,
		width: "100%",
		borderRadius: "0",
		borderTop: "2px solid #ff9800",
		borderBottom: "2px solid #ff9800",
		margin: "8px 0",
		backgroundColor: "#fff",
	},
	image: {
		margin: "8px",
		objectFit: "cover",
		border: "2px solid #ff9800",
	},
	spimg: {
		width: "100%",
		objectFit: "cover",
		marginTop: "16px",
	},
	clozangBar: {
		display: "flex",
	},
	clozCol: {
		diplay: "flex",
		flexDirection: "column",
		marginBottom: "16px",
	},
};

class Spark extends Component {
	state = {
		fusers: null,
	};


	render() {
		dayjs.extend(relativeTime);

		const {
			classes,
			fusers,
			spark: {
				userClozang,
				userImage,
				heatCount,
				stokeCount,
				body,
				createdAt,
				fire,
				sparkId,
				embered,
				emberCount,
				infernal,
				sparkImage,
				sparkVideo,
				sparkAudio,
				sparkLink,
				emberId,
				emberBody,
				emberPoster,
				emberDate,
				emberVideo,
				emberImage,
				emberAudio,
				emberLink
			},
			user: {
				authenticated,
				credentials: { clozang },
			},
		} = this.props;
		

		let sparkImg = sparkImage ? (
			<Fragment>
				<img src={sparkImage} alt="spark image" className={classes.spimg} />
				<br />
			</Fragment>
		) : null;

		let sparkVid = sparkVideo ? (
			<Fragment>
				<div className="vid-cont" style={{textAlign: 'center', marginTop: '16px', position: 'relative', height: 0, paddingBottom: '56.25%', width: '100%' }}>
				<iframe
					src={sparkVideo}
					allowFullScreen
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%'
					}}
				></iframe>
				</div>
				
				<br />
			</Fragment>
		) : null;

		let sparkEmber = emberId !== "" ? (
			emberVideo !== "" ? (
				<Fragment>
				
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<div className="vid-cont" style={{textAlign: 'center', marginTop: '16px', position: 'relative', height: 0, paddingBottom: '56.25%', width: '100%' }}>
				<iframe
					src={emberVideo}
					allowFullScreen
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%'
					}}
				></iframe>
				</div>
				
				<br />
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />

			</Fragment>
			) : emberImage !== "" ? (
				<Fragment>
						<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<img src={emberImage} alt="ember image" className={classes.spimg} />
				<br />
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>
			) : emberAudio !== "" ? (
				<Fragment>
						<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<div id="aPlayer" className="centered">
				<audio controls style={{backgroundColor: "transparent", outline: "none"}}>
					<source style={{backgroundColor: "#ff9800", borderRadius: "16px 0 16px 0"}} src={emberAudio}></source>
				</audio>
				</div>
				<br/>
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>
			) : (<Fragment>
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<br/>
					<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>) ) : null;

		let sparkAud = sparkAudio ? (
			<Fragment>
				<hr className="bar-separator" />
				<div id="aPlayer" className="centered">
				<audio controls style={{backgroundColor: "transparent", outline: "none"}}>
					<source style={{backgroundColor: "#ff9800", borderRadius: "16px 0 16px 0"}} src={sparkAudio}></source>
				</audio>
				</div>
				<br/>
				<hr className="bar-separator" />
			</Fragment>
		) : null;

		const deleteButton =
			authenticated && userClozang === clozang ? (
				<ExtinguishSpark sparkId={sparkId} />
			) : null;

		const emberButton =
		emberId === "" ? (
			<Fragment>
				<ShareEmber emberId={sparkId} spark={this.props.spark}/>
					<span>{emberCount}</span>
			</Fragment>			
		) : null;
		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<div className={classes.clozangBar}>
						<span>
							<Avatar src={userImage} className={classes.image}></Avatar>
						</span>
						<div className={classes.clozCol}>
							<span>
								<Typography
									variant="h6"
									color="primary"
									component={Link}
									to={`/${userClozang}`}
								>
									<strong>{userClozang}</strong>
								</Typography>
							</span>
							<Typography variant="body2" color="textSecondary">
								{dayjs(createdAt).fromNow()}
							</Typography>
						</div>
					</div>

					<Typography variant="body2" color="primary" className="breaks">
						<b>{body}</b>
					</Typography>
					{sparkImg}
					{sparkVid}
					{sparkAud}
					{sparkEmber}
					<HeatButton sparkId={sparkId} />
					<span>{heatCount}</span>
					<SparkBox
						sparkId={sparkId}
						userClozang={userClozang}
						openDialog={this.props.openDialog}
					/>
					<span>{stokeCount}</span>
					{emberButton}		
					
					<span>{deleteButton}</span>
				</CardContent>
				{fire === true && <FireIcon color="secondary" className="icon9" />}
				{infernal === true && (
					<FireIcon className="icon9 torch" />
				)}
			</Card>
		);
	}
}

Spark.propTypes = {
	addHeat: PropTypes.func.isRequired,
	removeHeat: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	spark: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	addHeat,
	removeHeat
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Spark));
