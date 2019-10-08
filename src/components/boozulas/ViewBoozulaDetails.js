import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Components
import CheersButton from './CheersButton';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import CloseIcon from "../icons/CloseIcon";
import ToastIcon from '../icons/ToastIcon';
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
        height: '3px',
        backgroundColor: '#b7410e',
        border: 'none'
      },
      boozulaImage: {
        maxWidth: 160,
        height: 160,
        objectFit: "cover",
        borderRadius: "16px 0 16px 0",
        border: "2px solid #b7410e",

      },
      dialogContent: {
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#263238"
      },
      closeButton: {
        position: "absolute",
        left: "82%"
      },
      expandButton: {
        float: 'right'
  },
  spinnerDiv: {
        paddingLeft: "100px" 
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
        userAlias,
        boozImage,
        createdAt,
        ingredients,
        preparation,
        drinkWare,
        garnish,
        cheersCount,
        toastCount,
        boozId
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress className="rusty2" size={100} thickness={4}/>
        </div>
    ) : (
     <Grid container spacing={10} className="dark viewer">
        <Grid item sm={4}>
          <img src={boozImage} alt="Boozula" className={classes.boozulaImage} />
        </Grid>
        <Grid item sm={6} className={classes.stuff}>
        <Typography variant="h5" className="rusty"><strong>:{drinkName}:</strong></Typography>
            <Typography
              component={Link}
              color="primary"
              variant="body2"
              to={`/users/>${userAlias}`}
          >
            <strong className="rust foam"><strong className="rusty">Posted By: </strong> >{userAlias}</strong>
          </Typography>
          <hr className="bar-separator-booz" />
          <Typography variant="body2" className="foam">
            {dayjs(createdAt).format("h:mm a, MMMM DD, YYYY")}
          </Typography>
          <hr className="bar-separator-booz" />          
         <CheersButton boozId={boozId}/>
          <span className="rusty">{cheersCount}</span>
          <OwlFuseButton tip={`THIS BOOZULA HAS ${toastCount} TOASTS`}>
            <ToastIcon className="icon6 rust foam"/>
          </OwlFuseButton>
          <span className="rusty">{toastCount}</span>
          <Typography variant="body1" className="foam">
            <strong className="rusty">Main Alcohol:</strong> {mainAlcohol}
          </Typography>
          {ingredients && 
          <Fragment>
          <hr className="bar-separator-booz"/>
          <Typography variant="body1" className="foam breaks">
            <strong className="rusty">Ingredients:</strong><br/>{ingredients}
          </Typography>
            </Fragment>}
          {preparation && <Fragment>
            <hr className="bar-separator-booz"/>
          <Typography variant="body1" className="foam breaks">
            <strong className="rusty">Preparation:</strong><br/> {preparation}
          </Typography>
            </Fragment>}
          {drinkWare && <Fragment>
            <hr className="bar-separator-booz"/>
          <Typography variant="body1" className="foam">
            <strong className="rusty">Drinkware:</strong> {drinkWare}
          </Typography>
          </Fragment>}
          {garnish && <Fragment>
            <hr className="bar-separator-booz"/>
          <Typography variant="body1" className="foam">
            <strong className="rusty">Garnish:</strong> {garnish}
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
          <ViewBoozIcon className="icon2 rust foam" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth maxWidth="sm"
          className="charcoal-border">
          <OwlFuseButton
            tip="CLOSE"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon className="foam rust"/>
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
  userAlias: PropTypes.string.isRequired,
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
