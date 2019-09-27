import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { logoutUser } from '../redux/actions/userActions';
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// Icons
import LocationIcon from './icons/LocationIcon';
// Redux Stuff
import { connect } from "react-redux";

const styles = theme => ({
  paper: {
    padding: 16,
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    backgroundColor: "#37474f"
  },
  Candle: {
    margin: 8,
    borderTop: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800",
    borderRight: "2px solid #ff9800",
    backgroundColor: "#fff",
    borderRadius: "16px 0 16px 0",
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
        padding: "16px"
      }
    },
    "& .Candle-image": {
      border: "2px solid #ff9800",
      width: 144,
      height: 144,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      margin: 8
    },
    "& .Candle-details": {
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
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  joined: {
    color: "#ff9800"
  }
});

class Candle extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { alias, clozang, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let CandleMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.Candle}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="Candle" className="Candle-image" />
          </div>
          <hr />
          <div className="Candle-details">
            <MuiLink component={Link} to={`/users/${clozang}`} color="primary" variant="h5">
              <strong>>{alias}</strong>
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationIcon color="secondary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}{website}
                </a>
                <hr />
              </Fragment>
            )}
                    
            <span>Member since {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
        </div>
      </Paper>
    ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            NO Candle FOUND, PLEASE LOGIN AGAIN OR SIGN UP FOR A NEW ACCOUNT
                </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary"
              component={Link} to="/login">
              LOGIN
                    </Button>
            <Button variant="contained" color="secondary"
              component={Link} to="/signup">
              SIGN UP
                    </Button>
          </div>
        </Paper>
      )
    ) : (
        <p className="loading">
    <strong>Loading...</strong>
  </p>
      );

    return CandleMarkup;
  }
}

Candle.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Candle));