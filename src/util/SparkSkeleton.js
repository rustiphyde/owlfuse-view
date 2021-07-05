import React, { Fragment } from 'react';
import NoImg from '../images/No-owlfuse-pic.png';
import PropTypes from 'prop-types';
import OwlFuseButton from './OwlFuseButton';

// MUI Components
import Avatar from "@material-ui/core/Avatar";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

// Icons
import HeatIcon from '../components/icons/HeatIcon';
import StokeIcon from '../components/icons/StokeIcon';
import EmberIcon from '../components/icons/EmberIcon';
import ExtinguishIcon from '../components/icons/ExtinguishIcon';

const styles = (theme) => ({
  card: {
    // maxWidth: '98vw',
    position: "relative",
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#263238"
  },
	content: {
		padding: 25,
		width: "100%",
		borderRadius: "0",
		borderTop: "2px solid #ff9800",
		borderBottom: "2px solid #ff9800",
		margin: "8px 0",
		backgroundColor: "#fff",
    textAlign: "left"
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
  cover: {
    margin: "8px 0 8px 8px",
    minWidth: 112,
    maxHeight: 112,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800"
  },
  alias: {
    marginTop: 8,
    width: '160px',
    height: '20px',
    backgroundColor: '#263238',
    marginBottom: 10
  },
  date: {
    height: 12,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 8
  },
  fullLine: {
    height: 12,
    width: '90%',
    marginBottom: 8,
    backgroundColor: '#263238'
  },
  halfLine: {
    height: 12,
    width: '45%',
    marginBottom: 8,
    backgroundColor: '#263238'
  },
  num: {
    fontSize: "1.5rem"
  },
  baloo: {
    fontFamily: "Baloo"
  }

})

const SparkSkeleton = (props) => {
  const { classes, length } = props;

  const content = Array.from({ length }).map((item, index) => (
    <Card className={classes.card} key={index}>
       <CardContent className={classes.content}>
					<div className={classes.clozangBar}>
						<span>
							<Avatar src={NoImg} className={classes.image}></Avatar>
						</span>
						<div className={classes.clozCol}>
							<span>
								<Typography
									variant="h6"
									color="primary"
								>
									<strong>&gt;owl-fuser</strong>
								</Typography>
							</span>
							<Typography variant="body2" color="textSecondary">
								? days ago
							</Typography>
						</div>
					</div>
          <hr className="bar-separator" />
					<Typography variant="body2" color="primary" className="breaks">
          <b className={classes.baloo}>Spark an interest</b>
          <div className={classes.halfLine}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
					</Typography>
					<hr className="bar-separator" />
					<HeatIcon/>
					<span className={classes.num}>  ? </span>
					<StokeIcon/>
					<span className={classes.num}> ? </span>
					<EmberIcon/>
          <span className={classes.num}> ? </span>	
					<hr className="bar-separator" />
					<ExtinguishIcon/> <span className="warning-label"><b className="smaller">IN CASE OF EMERGENCY</b></span>
          
				</CardContent>
    </Card>
  ))

  return <Fragment>{content}</Fragment>
}

SparkSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
  length: PropTypes.number.isRequired
}

export default withStyles(styles)(SparkSkeleton);