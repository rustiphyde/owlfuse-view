import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import CloseIcon from "../icons/CloseIcon";
import ViewSongIcon from '../icons/ViewSongIcon'
// Redux Stuff
import { connect } from 'react-redux';
import { getOkelist } from '../../redux/actions/dataActions';

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
      dialogContent: {
        padding: 20,
        color: "#ff9800 !important",
        backgroundColor: '##37474f',
        overflowY: "auto",
        overflowX: "hidden",
      },
      closeButton: {
        position: "absolute",
        left: "84%"
      },
      charcoal: {
        backgroundColor: '#37474f !important'
      }
});

class OkeDialog extends Component {
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
        this.props.getOkelist(this.props.okeId);
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      render() {
        const {
          classes,
          okelist: {
            okeId,
            listName,
            songs
          },
          UI: { loading }
        } = this.props;
    
        const dialogMarkup = loading ? (
          <CircularProgress size={200} />
        ) : (
         <Grid container spacing={10} className={classes.charcoal}>
           
            <Grid item sm={10} className={classes.stuff}>
            <hr className="bar-separator"/>
            <hr className="bar-separator"/>
            <hr className="bar-separator"/>
            <Typography variant="h6" color="secondary" className={classes.name}><strong><span className={classes.clef}>𝄞</span> {listName} - Songs</strong></Typography>
              <hr className={classes.invisibleSeparator} />
              <hr className="bar-separator"/>            
            </Grid>
            <hr className="bar-separator"/>
          </Grid>
        );
        return (
          <Fragment>
            <OwlFuseButton
              onClick={this.handleOpen}
              tip="VIEW SONGS"
              tipClassName={classes.expandButton}
            >
              <ViewSongIcon color="primary" className="icon2" />
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

OkeDialog.propTypes = {
    getOkelist: PropTypes.func.isRequired,
    okeId: PropTypes.string.isRequired,
    okelist: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    okelist: state.data.okelist,
    UI: state.UI
})

const mapActionsToProps = {
    getOkelist
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(OkeDialog));