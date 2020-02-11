import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImg from '../images/No-owlfuse-pic.png';

// MUI Stuff
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Components

// Icons
import LocationIcon from "../components/icons/LocationIcon";
import CandleIcon from '../components/icons/CandleIcon';
import LinkIcon from '../components/icons/LinkIcon';

// Utils
import OwlFuseButton from './OwlFuseButton';

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
      position: "relative",
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
    },
  },
  joined: {
    color: "#ff9800"
  }
});

const CandleSkeleton = (props) => {

  const {
    classes } = props;

   
        

  return (
    <Paper className={classes.paper}>
      <div className={classes.candle}>
        <div className="image-wrapper">
          <img src={NoImg} alt="candle" className="candle-image" />
              
        </div>
        <hr />
        <div className="candle-details">
          <Typography

            color="primary"
            variant="h5"
          >
            <strong>>owl-fuser</strong>
          </Typography>
          <hr />
          <CandleIcon color="secondary" className="icon" />
          <Typography variant="body2"><strong>Candle was ignited</strong></Typography>
        </div>
      </div>
    </Paper>
  )
}
CandleSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CandleSkeleton);
