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
import EmberIcon from '../icons/EmberIcon';

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
        margin: 'auto'
      },
      spimg: {
        width: '100%',
        objectFit: 'cover',
        marginTop: '16px'
      },
});

class SparkBox extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };

  componentDidMount(){
    if(this.props.openDialog){
        if(this.state.oldPath === '' && this.state.newPath === ''){
          this.setState({ open: false });
          this.props.clearErrors();
          console.log('closed');
          return window.location.href = `/sparks`;
        }
        this.handleOpen();
      }      
}

  handleOpen = () => {
    let oldPath = window.location.pathname.replace('%3E', '>');
    const { userClozang, sparkId } = this.props;
    const newPath = `/${userClozang}/spark/${sparkId}`;
    
    if (this.state.oldPath === this.state.newPath){
      oldPath = `/${userClozang}`;
    } else {
      oldPath = this.state.oldPath;
    }
      
    

    window.history.pushState(null, null, newPath);


    this.setState({ open: true, oldPath, newPath });
    this.props.getSpark(this.props.sparkId);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
    window.location.href = this.state.oldPath;
  };
  render() {
    const {
      classes,
      spark: {
				userClozang,
				heatCount,
				stokeCount,
				body,
				createdAt,
        sparkId,
        stokes,
        embered,
        emberCount,
				sparkImage,
				sparkVideo,
				sparkAudio,
        sparkLink,
        emberId,
        emberBody,
        emberPoster,
        emberDate,
        emberVideo,
        emberImage,
        emberAudio,
        emberLink
			},
      UI: { loading }
    } = this.props;

    let sparkEmber = emberId !== "" ? (
			emberVideo !== "" ? (
				<Fragment>
				
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
				<div className="vid-cont">
				<iframe
					className={classes.spimg}
					src={emberVideo}
					allowFullScreen
					height="315"
					width="560"
				></iframe>
				</div>
				
				<br />
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />

			</Fragment>
			) : emberImage !== "" ? (
				<Fragment>
						<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<img src={emberImage} alt="ember image" className={classes.spimg} />
				<br />
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>
			) : emberAudio !== "" ? (
				<Fragment>
						<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<div id="aPlayer" className="centered">
				<audio controls style={{backgroundColor: "transparent", outline: "none"}}>
					<source style={{backgroundColor: "#ff9800", borderRadius: "16px 0 16px 0"}} src={emberAudio}></source>
				</audio>
				</div>
				<br/>
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>
			) : (<Fragment>
				<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>				
				<hr className="bar-separator" />
				<span>
								<Typography
									variant="body2"
									color="primary"
									component={Link}
									to={`/${emberPoster}`}
								>
									<strong>{emberPoster} </strong>
								</Typography>
							<Typography variant="body2" color="textSecondary">
							{dayjs(emberDate).format("h:mm a, MMMM D, YYYY")}
							</Typography></span>
							<Typography variant="body2" color="primary" className="breaks">
						<b>{emberBody}</b>
					</Typography>
					<br/>
					<hr className="bar-separator" />
				<div className="centered">
				<EmberIcon className="rusty"/>
				</div>
				<hr className="bar-separator" />
			</Fragment>) ) : null;

    let sparkImg = sparkImage ? (
			<Fragment>
				<img src={sparkImage} alt="spark image" className={classes.spimg} />
				<br />
			</Fragment>
    ) : null;
    
    let sparkVid = sparkVideo ? (
			<Fragment>
				<div className="centered">
        <iframe					
					src={sparkVideo}
					allowFullScreen
				></iframe>
        </div>
				<br />
			</Fragment>
		) : null;

		let sparkAud = sparkAudio ? (
			<Fragment>
				<hr className="bar-separator" />
				<div id="aPlayer" className="centered">
				<audio controls style={{backgroundColor: "transparent", outline: "none"}}>
					<source style={{backgroundColor: "#ff9800", borderRadius: "16px 0 16px 0"}} src={sparkAudio}></source>
				</audio>
				</div>
				<hr className="bar-separator" />
			</Fragment>
    ) : null;
    
    const emberButton =
		emberId === "" ? (
			<Fragment>
				<OwlFuseButton tip="SHARE AN EMBER">
					<EmberIcon className="orange" color="primary"/>
					</OwlFuseButton>
					<span>{emberCount}</span>
			</Fragment>			
		) : null;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress className="rusty2" size={100} thickness={4}/>
        </div>
    ) : (
     <Grid container spacing={6} className="charcoal-border">

        <Grid item sm={6} className={classes.stuff}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/${userClozang}`}
          >
          <strong>{userClozang}</strong>
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM D, YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1"><strong>{body}</strong></Typography>
          {sparkImg}
          {sparkVid}
          {sparkAud}
          {sparkEmber}
            <HeatButton sparkId={sparkId}/>
          <span>{heatCount}</span>
          <OwlFuseButton tip="STOKES">
            <StokeIcon color="secondary" />
          </OwlFuseButton>
          <span>{stokeCount}</span>
          {emberButton}
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
          fullWidth fullScreen
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
  spark: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
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
