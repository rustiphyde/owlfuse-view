import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Components
import CheersButton from './CheersButton';
import Toasts from './Toasts';
import ToastForm from './ToastForm';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from "../icons/CloseIcon";
import ToastIcon from '../icons/ToastIcon';

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
      boozulaImage: {
        maxWidth: 180,
        height: 180,
        borderRadius: "50%",
        objectFit: "cover",
        border: "6px double #ff9800"
      },
  dialogContent: {
        color: '#ff9800',
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#263238"
      },
      closeButton: {
        position: "absolute",
        left: "82%"
      },
      spinnerDiv: {
        textAlign: 'center',
        margin: 'auto'
        
          }    
});

class ToastDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount(){
      if(this.props.openDialog){
          this.handleOpen();
      }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userClozang, boozId } = this.props;
    const newPath = `/${userClozang}/boozula/${boozId}`;

    if (this.state.oldPath === this.state.newPath) oldPath = `/${userClozang}`;

    window.history.pushState(null, null, newPath);




    this.setState({ open: true, oldPath, newPath });
    this.props.getBoozula(this.props.boozId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      boozula: {
        drinkName,
        userAlias,
        userClozang,
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
            <div className={classes.spinnerDiv}>
        <CircularProgress className="rusty2" size={100} thickness={4}/>
        </div>
    ) : (
     <Grid container spacing={10} className="dark">
        <Grid item sm={4}>
          <img src={boozImage} alt="Boozula" className={classes.boozulaImage} />
        </Grid>
        <Grid item sm={6} className={classes.stuff}>
        <Typography variant="h5" className="rusty"><strong>:{drinkName}:</strong></Typography>
          <Typography
            component={Link}
              className="rust foam"
            variant="body2"
            to={`/${userClozang}`}
          >
            <strong>Posted by {userClozang}</strong>
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" className="foam">
            {dayjs(createdAt).format("h:mm a, MMMM DD, YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <CheersButton boozId={boozId}/>
          <span>{cheersCount}</span>
          <OwlFuseButton tip={`THIS BOOZULA HAS ${toastCount} TOASTS`}>
            <ToastIcon className="icon6 rust foam" />
          </OwlFuseButton>
          <span>{toastCount}</span>
        </Grid>
          <hr className="bar-separator-booz" />
          <ToastForm boozId={boozId}/>
          <Toasts toasts={toasts} />
          <span className="foam center dark"><strong>END OF TOASTS</strong></span>
      </Grid>
    );
    return (
      <Fragment>
        <OwlFuseButton
          onClick={this.handleOpen}
          tip="TOASTS"
          tipClassName={classes.expandButton}
        >
          <ToastIcon className="icon6 rust foam" />
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
            <CloseIcon className="rust foam"/>
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
  userAlias: PropTypes.string.isRequired,
  userClozang: PropTypes.string.isRequired,
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
