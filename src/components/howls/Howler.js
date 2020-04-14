import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';
import Typography from '@material-ui/core/Typography';
import { fetchFuserHowls, getFuser } from '../../redux/actions/dataActions';
import HowlIcon from '../icons/HowlIcon';

const styles = {

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
        return(
            <Fragment>
                <Typography className={classes.text}>
        <strong className="foam orange" onClick={this.openHowl}>{howler}</strong>
                </Typography>
                <OwlFuseButton
                tip="OPEN HOWL"
                onClick={this.openHowl}
                >
                    <HowlIcon className="icon2 foam orange"/>
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