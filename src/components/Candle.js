import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { logoutUser, uploadImage } from "../redux/actions/userActions";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Components
import EditCandleDetails from './EditCandleDetails';
// Icons
import LocationIcon from "./icons/LocationIcon";
import SelfieIcon from "./icons/SelfieIcon";
import CandleIcon from './icons/CandleIcon';
import LogoutIcon from './icons/LogoutIcon';
import LinkIcon from './icons/LinkIcon';

// Redux Stuff
import { connect } from "react-redux";

// Utils
import OwlFuseButton from '../util/OwlFuseButton';

const styles = theme => ({
  paper: {
    padding: 16,
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    backgroundColor: "#37474f"
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
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
        padding: "16px"
      }
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
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          alias,
          createdAt,
          imageUrl,
          bio,
          website,
          location
        },
        loading,
        authenticated
      }
    } = this.props;

    let CandleMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.candle}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="candle" className="candle-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <OwlFuseButton
                tip="EDIT CANDLE IMAGE"
                onClick={this.handleEditPicture}
                className="button"
                >
                <SelfieIcon color="primary" className="icon6 orange"/>
                </OwlFuseButton>
            </div>
            <hr />
            <div className="candle-details">
              <MuiLink
                component={Link}
                to={`/users/${alias}`}
                color="primary"
                variant="h5"
              >
                <strong>>{alias}</strong>
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2"><strong>{bio}</strong></Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationIcon color="secondary" className="icon" />{" "}
                  <Typography variant="body2"><b>{location}</b></Typography>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    <OwlFuseButton tip={`${website.toUpperCase()}`}>
                    <LinkIcon className="icon orange" color="primary" />
                    </OwlFuseButton>
                  </a>
                  <hr />
                </Fragment>
              )}
              <CandleIcon color="secondary" className="icon"/>
              <Typography variant="body2"><strong>Candle was ignited in {dayjs(createdAt).format("MMMM")} of{" "}
                {dayjs(createdAt).format("YYYY")}</strong></Typography>
            </div>
            <OwlFuseButton
              tip="LOGOUT"
              onClick={this.handleLogout}>
            <LogoutIcon color="primary" className="icon orange"/>
            </OwlFuseButton>
            <EditCandleDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center" color="secondary">
            <strong>NO CANDLE FOUND, PLEASE LOGIN AGAIN OR SIGN UP FOR A NEW ACCOUNT</strong>
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
                component={Link}
                color="primary"
                to="/signup"
            >
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
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  uploadImage,
  logoutUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Candle));
