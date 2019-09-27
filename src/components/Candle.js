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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Components

// Icons
import LocationIcon from "./icons/LocationIcon";
import SelfieIcon from "./icons/SelfieIcon";
import CandleIcon from './icons/CandleIcon';
import EditDetailsIcon from './icons/EditDetailsIcon';
import LogoutIcon from './icons/LogoutIcon';

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
        top: "68%",
        left: "70%",
        padding: "16px"
      }
    },
    "& .candle-image": {
      border: "2px solid #ff9800",
      width: 144,
      height: 144,
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
  render() {
    const {
      classes,
      user: {
        credentials: {
          alias,
          clozang,
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
              <Tooltip title="EDIT PROFILE IMAGE">
              <IconButton onClick={this.handleEditPicture} className="button">
                <SelfieIcon color="secondary" className="icon6"/>
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="candle-details">
              <MuiLink
                component={Link}
                to={`/users/${clozang}`}
                color="primary"
                variant="h5"
              >
                <strong>>{alias.replace(/\s/g, "-")}</strong>
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationIcon color="secondary" className="icon2" />{" "}
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CandleIcon color="secondary" className="icon2"/>
              <span>
                Candle was ignited in {dayjs(createdAt).format("MMMM")} of{" "}
                {dayjs(createdAt).format("YYYY")}
              </span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            NO Candle FOUND, PLEASE LOGIN AGAIN OR SIGN UP FOR A NEW ACCOUNT
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
              color="secondary"
              component={Link}
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
  uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  uploadImage
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Candle));
