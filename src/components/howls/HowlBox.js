import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import HowlIcon from '../icons/HowlIcon';
import Howl from './Howl';
import HowlPostIcon from '../icons/HowlPostIcon';
import { increaseHowlCount, fetchSingleHowl, fetchFuserHowls, postHowl, getHowlCount } from '../../redux/actions/dataActions';
//MUI Stuff
import { Button, DialogTitle, DialogContent, DialogActions, TextField, Dialog, Paper, Typography, Grid, Modal } from '@material-ui/core';



const styles = (theme) => ({
    ...theme.themeMinusPalette,
  
    dialog: {
        padding: 16,
        borderRadius: "32px",
      },
      cont: {
          overflow: "hidden"
      },
      form: {
        padding: 16
      },
      title: {
        color: "#ff9800",
        textAlign: "center"
      },
    field: {
		backgroundColor: "white",
        borderRadius: "16px",
        border: "6px solid #263238",
		padding: "8px 32px",
		marginBottom: "8px",
		marginTop: "8px",
        width: "100%"
	},
});

class HowlBox extends Component {

    state = {
        howls: null,
        howlBody: "",
        open: false,
        howlCount: 0
    }

    handleOpen = () => {
        this.setState({ open: true });
        console.log("open");
        this.props.fetchSingleHowl(this.props.docKey)
        this.props.getHowlCount(this.props.dockey);
        this.setState({ howls: this.props.howls});
        this.setState({ howlCount: this.props.count.howlCount});
    }

    handleClose = () => {
        this.setState({ open: false });
        console.log("closed")
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    postHowlFxn = () => {
        this.props.postHowl(this.props.fuser, ({ howlBody: this.state.howlBody,
            avatar: this.props.user.credentials.imageUrl }));
        this.props.increaseHowlCount([this.props.fuser, this.props.user.credentials.clozang].sort().join("::"));
        setTimeout(() => this.setState({ howlBody: ''}), 20);    
        setTimeout(() => this.props.fetchFuserHowls(this.props.fuser), 500);
    }

    render(){

const { classes, howls, count:{ howlCount }, fuser, UI: { loading } } = this.props;
const { credentials: { clozang }} = this.props.user;
        let howlsMarkup = !loading ? ( howls && howls.length > 0 ?
        (
            <Howl/>
        ) : null ) : (<div>Loading...</div>)
        return(
        <Fragment>
            <OwlFuseButton
            onClick={this.handleOpen}
            tip="OPEN HOWLBOX"
            >
                <HowlIcon className="icon14 foam orange"/>
            </OwlFuseButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.dialog}
            disableBackdropClick={true}
            maxwidth="sm"
            >
                <DialogTitle className={classes.title}>
        <strong className="rusty">{fuser}</strong> 
                    </DialogTitle>  
                <DialogContent className={classes.cont}>
                                      
                        {howlsMarkup}
                        <form className={classes.form}>
                                <TextField fullWidth 
                                value={this.state.howlBody}
                                onChange={this.handleChange}
                                id="howlBody"
                                name="howlBody"
                                type="text"
                                placeholder="POST A HOWL"
                                multiline
                                className={classes.field} />
                        <OwlFuseButton tip="POST HOWL"
                        onClick={this.postHowlFxn}>
                        <HowlPostIcon className="icon2 orange"/>
                        </OwlFuseButton>
						
                        </form>
                            
                        </DialogContent>
                        <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              EXIT HOWL
            </Button>
                        </DialogActions>
            </Dialog>
        </Fragment>
        )
    }
}

HowlBox.propTypes = {
    classes: PropTypes.object.isRequired,
    howls: PropTypes.array,
    count: PropTypes.object,
    fetchSingleHowl: PropTypes.func.isRequired,
    docKey: PropTypes.string,
    fuser: PropTypes.string,
    user: PropTypes.object.isRequired,
    fetchFuserHowls: PropTypes.func.isRequired,
    postHowl: PropTypes.func.isRequired,
    increaseHowlCount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    howls: state.data.howls,
    UI: state.UI,
    user: state.user,
    data: state.data,
    count: state.data.count
});

const mapActionsToProps = {
    fetchSingleHowl,
    fetchFuserHowls,
    getHowlCount,
    postHowl,
    increaseHowlCount
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HowlBox));