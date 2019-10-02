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
import ViewBoozIcon from "../icons/ViewBoozIcon";
// Redux Stuff
import { connect } from "react-redux";
import { getBoozula } from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme.themeMinusPalette,
    invisibleSeparator: {
        border: 'none'
    },
    visibleSeparator: {
        margin: '6px 0 6px 0',
        height: '1px',
        backgroundColor: '#ff9800',
        border: 'none'
      },
      boozulaImage: {
        margin: "8px 0 8px 8px",
        maxWidth: 180,
        height: 180,
        objectFit: "cover",
        borderRadius: "16px 0 16px 0",
        borderTop: "2px solid #ff9800",
        borderLeft: "2px solid #ff9800",
        borderBottom: "2px solid #ff9800"
      },
      dialogContent: {
        padding: 20,
        borderRadius: "60px 0px 60px 0",
        color: "#ff9800",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "primary !important"
      },
      closeButton: {
        position: "absolute",
        left: "82%"
      },
      expandButton: {
        float: 'right'
      }
    });

class ViewBoozulaDetails extends Component {
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
        mainAlcohol,
        userCandle,
        boozImage,
        createdAt,
        ingredients,
        preparation,
        served,
        drinkWare,
        garnish,
        cheers,
        toastCount,
        firstCandle,
        boozId
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
        <Typography variant="h5"><strong>{drinkName}</strong></Typography>
          <Typography
            component={Link}
            color="primary"
            variant="body2"
            to={`/users/>${firstCandle}`}
          >
            <strong>Posted by >{userCandle}</strong>
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD, YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          
         <CheersIcon color="primary"/>
          <span>{cheers}</span>
          <OwlFuseButton tip={`THIS BOOZULA HAS ${toastCount} TOASTS`}>
            <ToastIcon color="primary" />
          </OwlFuseButton>
          <span>{toastCount}</span>
          <Typography variant="body1" color="primary">
            <strong>Main Alcohol:</strong> {mainAlcohol}
          </Typography>
          {ingredients && 
          <Fragment>
          <hr className="bar-separator"/>
          <Typography variant="body1" color="primary">
            <strong>Ingredients:</strong> {ingredients}
          </Typography>
            </Fragment>}
          {preparation && <Fragment>
            <hr className="bar-separator"/>
          <Typography variant="body1" color="primary">
            <strong>Preparation:</strong> {preparation}
          </Typography>
            </Fragment>}
          {drinkWare && <Fragment>
            <hr className="bar-separator"/>
          <Typography variant="body1" color="primary">
            <strong>Drinkware:</strong> {drinkWare}
          </Typography>
          </Fragment>}
          {garnish && <Fragment>
            <hr className="bar-separator"/>
          <Typography variant="body1" color="primary">
            <strong>Garnish:</strong> {garnish}
          </Typography>
            </Fragment>}
        </Grid>
        <hr className={classes.visibleSeparator}/>
      </Grid>
    );
    return (
      <Fragment>
        <OwlFuseButton
          onClick={this.handleOpen}
          tip="VIEW DETAILS"
          tipClassName={classes.expandButton}
        >
          <ViewBoozIcon color="primary" className="icon2 rust" />
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

ViewBoozulaDetails.propTypes = {
  getBoozula: PropTypes.func.isRequired,
  boozId: PropTypes.string.isRequired,
  userCandle: PropTypes.string.isRequired,
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
)(withStyles(styles)(ViewBoozulaDetails));
