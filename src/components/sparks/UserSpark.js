import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// Components
import ExtinguishSpark from './ExtinguishSpark';
import SparkBox from './SparkBox';
import HeatButton from './HeatButton';

// Icons
import FireIcon from "../icons/FireIcon";
import InfernalIcon from "../icons/InfernalIcon";

// Redux
import { connect } from "react-redux";
import { addHeat, removeHeat, getFusers } from "../../redux/actions/dataActions";

const styles = {
	card: {
		// maxWidth: '98vw',
		position: "relative",
		display: "flex",
		marginBottom: 8,
		borderRadius: "16px",
		backgroundColor: "#263238",
	},
	content: {
		padding: 25,
		width: 800,
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
    width: '100%',
    objectFit: 'cover',
    marginTop: '16px'
  },
  clozangBar: {
    display: 'flex',
  },
  clozCol: {
    diplay: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
  }
};

class UserSpark extends Component {

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      spark: {
				userClozang,
				userImage,
				heatCount,
				stokeCount,
				body,
				createdAt,
				fire,
				sparkId,
				emberable,
				embered,
				infernal,
				sparkImage,
				sparkVideo,
				sparkAudio,
				sparkLink,
			},
      user: { authenticated,  credentials: { clozang }   }
    } = this.props;


    const deleteButton = authenticated && userClozang === clozang ? (
      <ExtinguishSpark sparkId={sparkId}/>
    ) : null;

    let sparkImg = sparkImage ? (
			<Fragment>
				<img src={sparkImage} alt="spark image" className={classes.spimg} />
				<br />
			</Fragment>
    ) : null;

    let sparkVid = sparkVideo ? (
			<Fragment>
				<iframe
					className={classes.spimg}
					src={sparkVideo}
					allowFullScreen
					height="315"
					width="560"
				></iframe>
				<br />
			</Fragment>
		) : null;

		let sparkAud = sparkAudio ? (
			<Fragment>
				<hr className="bar-separator" />
				<div id="aPlayer" className="centered">
				<audio controls style={{backgroundColor: "transparent", outline: "none"}}>
					<source style={{backgroundColor: "#ff9800", borderRadius: "16px 0 16px 0"}} src={sparkAudio}></source>
				</audio>
				</div>
				<hr className="bar-separator" />
			</Fragment>
		) : null;
    
    return (
      <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.clozangBar}>
        <span><Avatar src={userImage} className={classes.image}></Avatar></span>
        <div className={classes.clozCol}>
        <span><Typography
          variant="h6"
          color="primary"
          component={Link}
          to={`/${userClozang}`}
        >
          <strong>{userClozang}</strong>
        </Typography></span>
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
        <HeatButton sparkId={sparkId} />
        <span>{heatCount}</span>
        <SparkBox
          sparkId={sparkId}
          userClozang={userClozang}
          openDialog={this.props.openDialog}
        />
        <span>{stokeCount}</span>
        <span>{deleteButton}</span>
      </CardContent>
      {fire === true && <FireIcon color="secondary" className="icon9" />}
      {infernal === true && (
        <InfernalIcon color="secondary" className="icon9" />
      )}
    </Card>
    );
  }
}

UserSpark.propTypes = {
  addHeat: PropTypes.func.isRequired,
  removeHeat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  spark: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  addHeat,
  removeHeat,
  getFusers

};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(UserSpark));
