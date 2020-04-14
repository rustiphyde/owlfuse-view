import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  connect } from 'react-redux';
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

class Howler extends Component{

    state = {
        fuser: null
    }

    openHowl = () => {
        this.props.fetchFuserHowls(this.props.howler);
        this.props.getFuser(this.props.howler);
        this.setState({ fuser: this.props.data.fuser.fuser });
        console.log(this.props.data.fuser);
    }

    render(){
        const { classes, howler } = this.props;
        const { fuser } = this.props.data.fuser;
        return(
            <Fragment>
                <Typography className={classes.text}>
        <strong className={ fuser === howler ? classes.selectedText : classes.unselectedText } onClick={this.openHowl}>{howler}</strong>
                </Typography>
                <OwlFuseButton
                tip="OPEN HOWL"
                onClick={this.openHowl}
                >
                    <HowlIcon className={ fuser === howler ? classes.selected : classes.unselected}/>
                </OwlFuseButton>
            </Fragment>
        )
    }
}

Howler.propTypes = {
    classes: PropTypes.object.isRequired,
    howler: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    fetchFuserHowls: PropTypes.func,
    getFuser: PropTypes.func
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps, { fetchFuserHowls, getFuser })(withStyles(styles)(Howler));