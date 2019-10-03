import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from "../icons/CloseIcon";
import ToastIcon from '../icons/ToastIcon';
import CheersIcon from '../icons/CheersIcon';

// Redux Stuff
import { connect } from "react-redux";
import { getBoozula } from "../../redux/actions/dataActions";

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
      outerRing: {
        width: 172,
        height: 172,
        alignSelf: 'center',
        border: "6px double #ff9800",
        borderRadius: "50%",
      },
      boozulaImage: {
        maxWidth: 180,
        height: 180,
        borderRadius: "50%",
        objectFit: "cover",
        border: "6px double #ff9800"
      },
      dialogContent: {
        padding: 20,
        borderRadius: "60px 0px 60px 0",
        color: "#ff9800",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "primary"
      },
      closeButton: {
        position: "absolute",
        left: "82%"
      }
});

class ToastDialog extends Component {
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
    this.props.getBoozula(this.props.boozId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      boozula: {
        drinkName,
        alias,
        klozang,
        boozImage,
        createdAt,
        cheersCount,
        toastCount,
        boozId,
        toasts
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} className={classes.progress}/>
    ) : (
     <Grid container spacing={10}>
        <Grid item sm={4}>
          <img src={boozImage} alt="Boozula" className={classes.boozulaImage} />
        </Grid>
        <Grid item sm={6} className={classes.stuff}>
        <Typography variant="h5" className="rusty"><strong>:{drinkName.toUpperCase()}:</strong></Typography>
          <Typography
            component={Link}
            color="primary"
            variant="body2"
            to={`/users/${klozang}`}
          >
            <strong>Posted by >{alias}</strong>
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD, YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <OwlFuseButton tip={`THIS BOOZULA HAS ${cheersCount} CHEERS`}>
            <CheersIcon className="icon6 rusty" />
          </OwlFuseButton>
          <span>{cheersCount}</span>
          <OwlFuseButton tip={`THIS BOOZULA HAS ${toastCount} TOASTS`}>
            <ToastIcon className="icon6 rusty" />
          </OwlFuseButton>
          <span>{toastCount}</span>
          
        </Grid>
        <hr className="bar-separator"/>
      </Grid>
    );
    return (
      <Fragment>
        <OwlFuseButton
          onClick={this.handleOpen}
          tip="TOASTS"
          tipClassName={classes.expandButton}
        >
          <ToastIcon color="primary" className="icon6 rust" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth maxWidth="sm" >
          <OwlFuseButton
            tip="CLOSE"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </OwlFuseButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ToastDialog.propTypes = {
  getBoozula: PropTypes.func.isRequired,
  boozId: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  boozula: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boozula: state.data.boozula,
  UI: state.UI
});

const mapActionsToProps = {
  getBoozula
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ToastDialog));
