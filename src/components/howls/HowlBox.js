import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import HowlIcon from '../icons/HowlIcon';
import Howl from './Howl';
import EditHowl from './EditHowl';
import { useFirestoreConnect } from 'react-redux-firebase';
import HowlPostIcon from '../icons/HowlPostIcon';
import { increaseHowlCount, fetchSingleHowl, fetchFuserHowls, postHowl, getHowlCount } from '../../redux/actions/dataActions';
//MUI Stuff
import { CircularProgress, Button, DialogTitle, DialogContent, DialogActions, Avatar, TextField, Dialog, Paper, Typography, Grid, Modal } from '@material-ui/core';



const styles = (theme) => ({
    ...theme.themeMinusPalette,
  
    dialog: {
        borderRadius: "32px",
        width: '100%'
      },
    //   cont: {
    //       overflow: "hidden"
    //   },
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
    userSent: {
		backgroundColor: "#263238",
		padding: "16px",
		color: "#f4db9d",
		width: "75%",
		float: "right",
		lineHeight: '20px',
		letterSpacing: '1px',
		margin: "8px",
		wordWrap: "break-word",
		fontWeight: 700,
		borderRadius: "16px 0 16px 0",
    },
    fuserSentPic: {
        float: 'left',
        margin: '6px 16px',
        border: '1.5px solid #f4db9d'
    },
    	fuserSent: {
		backgroundColor: "#ff9800",
		padding: "16px",
		letterSpacing: '1px',
		lineHeight: '20px',
		color: "#263238",
		width: "75%",
		float: "left",
		margin: "8px",
		fontWeight: 700,
		borderRadius: "0 16px 0 16px",
	}
});

const HowlBox = (props) => {
    
    useFirestoreConnect({collection: 'Howls', orderBy: ["createdAt", "asc"]});
	const howls = useSelector(state => state.firestore.ordered.Howls);

    const [ howlBody, setHowlBody] = useState("");

    const [ open, setOpen ] = useState(false);

    const [ howlCount, setHowlCount ] = useState(0);
    

    const handleOpen = () => {
        setOpen(true);
        
		setTimeout(() => {
			let cont = document.getElementById("howl-container");
			cont.scrollTo(0, cont.scrollHeight);
		}, 500)
        
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setHowlBody(event.target.value);
      };

    useEffect(() => {
		let cont = document.getElementById("howl-container");
			
		if(cont){
		setTimeout(() => {
			
			cont.scrollTo(0, cont.scrollHeight);
		}, 0)
		}
	},
	[howls]);


    const postHowlFxn = () => {
        props.postHowl(props.fuser, ({ howlBody: howlBody }));
        setHowlBody('');
    }

    

    let howlsMarkup = !props.loading ? (
        howls && howls.length > 0 ? (
            howls.map((howl) => {
            if(howl.docKey === props.docKey){
                let index = howls.indexOf(howl);
                return (
                    <div key={index + "54"}>
                        
                        <div
                            key={index}
                            className={
                                howl.sentBy === props.clozang ? props.classes.userSent : props.classes.fuserSent
                            }
                        >
                            
                           {
                               howl.sentBy === props.clozang ? (<EditHowl howl={howl} howlId={howl.howlId} className={props.classes.userSentPic} />) : <Avatar key={index + "83"} src={howl.avatar} className={
                                props.classes.fuserSentPic
                            }>

</Avatar>
                           }
                            {howl.howlBody}
                        </div>
                    </div>
                );
                        }
            })
        ) : (
            <strong className="candle centered">
                You do not have any howls to view at this time
            </strong>
        )
    ) : (
        <CircularProgress
        color="secondary"
        size={100}
        className="candle centered"
    />
    );
        return(
        <Fragment>
            <OwlFuseButton
            onClick={handleOpen}
            tip="OPEN HOWLBOX"
            >
                <HowlIcon className="icon14 foam orange needs-padding"/>
            </OwlFuseButton>
            <Dialog
            open={open}
            onClose={handleClose}
            className={props.classes.dialog}
            disableBackdropClick={true}
            maxWidth={true}
            // fullScreen={true}
            >
                <DialogTitle className={props.classes.title}>
        <strong className="rusty">{props.fuser}</strong> 
                    </DialogTitle>  
                <DialogContent className={props.classes.cont} id="howl-container">
                                      
                        {howlsMarkup}
                        <form className={props.classes.form}>
                                <TextField fullWidth 
                                value={howlBody}
                                onChange={handleChange}
                                id="howlBody"
                                name="howlBody"
                                helperText={props.UI.errors && props.UI.errors.howlBody ? props.UI.errors.howlBody : ''}
                                error={props.UI.errors && props.UI.errors.howlBody ? true : false}
                                type="text"
                                placeholder="POST A HOWL"
                                multiline
                                className={props.classes.field} />
                        <OwlFuseButton tip="POST HOWL"
                        onClick={postHowlFxn}>
                        <HowlPostIcon className="icon2 orange"/>
                        </OwlFuseButton>
						
                        </form>
                            
                        </DialogContent>
                        <DialogActions>
            <Button onClick={handleClose} color="secondary">
              EXIT HOWL
            </Button>
                        </DialogActions>
            </Dialog>
        </Fragment>
        
        )
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
    count: state.data.count,
    clozang: state.user.credentials.clozang
});

const mapActionsToProps = {
    fetchSingleHowl,
    fetchFuserHowls,
    getHowlCount,
    postHowl,
    increaseHowlCount
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HowlBox));