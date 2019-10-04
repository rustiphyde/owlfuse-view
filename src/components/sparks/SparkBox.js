import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Components
import Stokes from './Stokes';
import StokeForm from './StokeForm';
import HeatButton from './HeatButton';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import CloseIcon from "../icons/CloseIcon";
import StokeIcon from '../icons/StokeIcon';

// Redux
import { connect } from "react-redux";
import { getSpark, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme.themeMinusPalette,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',

        borderBottom: '1px solid #ff9800',
        marginBottom: 20
      },
      profileImage: {
        maxWidth: 144,
        maxHeight: 144,
        borderRadius: "50%",
        objectFit: "cover",
        border: "6px double #ff9800"
      },
      dialogContent: {
        padding: 20,
        color: "#ff9800",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "primary"
      },
      closeButton: {
        position: "absolute",
        left: "82%",
        top: "5%"

      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
      }
});

class SparkBox extends Component {
  state = {
    open: false
  };
  componentDidMount(){
      if(this.props.openDialog){
          this.handleOpen();
      }
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getSpark(this.props.sparkId);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      spark: {
        sparkId,
        body,
        createdAt,
        heatCount,
        stokeCount,
        klozang,
        userImage,
        alias,
        stokes
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress color="secondary"size={200} thickness={2}/>
        </div>
    ) : (
     <Grid container spacing={6} className="charcoal-border">
        <Grid item sm={4}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={6} className={classes.stuff}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${klozang}`}
          >
          <strong>>{alias}</strong>
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1"><strong>{body}</strong></Typography>
            <HeatButton sparkId={sparkId}/>
          <span>{heatCount}</span>
          <OwlFuseButton tip="STOKES">
            <StokeIcon color="secondary" />
          </OwlFuseButton>
          <span>{stokeCount}</span>
        </Grid>
          <hr className="bar-separator" />
          <StokeForm sparkId={sparkId} className="center"/>
          <Stokes stokes={stokes} />
          <span className="orng center dark"><strong>END OF STOKES</strong></span>
      </Grid>
    );
    return (
      <Fragment>
        <OwlFuseButton
          onClick={this.handleOpen}
          tip="VIEW STOKES"
          tipClassName={classes.expandButton}
        >
          <StokeIcon color="primary" className="icon6 orange" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth maxWidth="sm"
          >
          <OwlFuseButton
            tip="CLOSE"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon className="orange"/>
          </OwlFuseButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SparkBox.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getSpark: PropTypes.func.isRequired,
  sparkId: PropTypes.string.isRequired,
  klozang: PropTypes.string.isRequired,
  spark: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  spark: state.data.spark,
  UI: state.UI
});

const mapActionsToProps = {
  getSpark,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SparkBox));
