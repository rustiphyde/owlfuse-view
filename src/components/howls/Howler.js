import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import OwlFuseButton from '../../util/OwlFuseButton';
import Typography from '@material-ui/core/Typography';
import { fetchFuserHowls, getFuser } from '../../redux/actions/dataActions';
import HowlIcon from '../icons/HowlIcon';

const styles = {
    selected: {
        fontSize: '2.5rem',
        color: '#ff9800'
    },
    unselected: {
        color: '#f4db9d',
        fontSize: '2.5rem',
        '&:hover': {
            color: '#ff9800'
        }
    },
    selectedText: {
        color: '#ff9800'
    },
    unselectedText: {
        color: '#f4db9d !important',
        '&:hover': {
            color: '#ff9800 !important'
        }
    }
}

const Howler = props => {


    const openHowl = () => {
        props.closeMenu();
        props.getFuser(props.howler);
        setTimeout(() => {

			let cont = document.getElementById("howl-container");
			if (cont) {
				cont.scrollTo(0, cont.scrollHeight);
			}
		}, 500);

    }

        return(
            <Fragment>
                <Typography className={props.classes.text}>
        <strong className={ props.fuser === props.howler ? props.classes.selectedText : props.classes.unselectedText } onClick={openHowl}>{props.howler}</strong>
                </Typography>
                <OwlFuseButton
                tip="OPEN HOWL"
                onClick={openHowl}
                >
                    <HowlIcon className={ props.fuser === props.howler ? props.classes.selected : props.classes.unselected}/>
                </OwlFuseButton>
            </Fragment>
        )
}

Howler.propTypes = {
    classes: PropTypes.object.isRequired,
    howler: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    closeMenu: PropTypes.func,
    getFuser: PropTypes.func
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user,
    fuser: state.data.fuser.fuser
})

export default connect(mapStateToProps, { fetchFuserHowls, getFuser })(withStyles(styles)(Howler));