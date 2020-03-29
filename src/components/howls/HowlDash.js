import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';

import { fetchUserHowls } from '../../redux/actions/dataActions';

//MUI Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import HowlIcon from '../icons/HowlIcon';

const styles = {
    dash: {
        backgroundColor: '#263238 !important',
        color: '#ff9800 !important',
        fontFamily: '"Baloo", cursive !important'
    }
};

class HowlDash extends Component {
    render(){

        const { classes } = this.props;

        return(
            <Fragment>
                <OwlFuseButton tip="OPEN HOWL MENU">
                    <HowlIcon className="foam orange icon15"/>
                </OwlFuseButton>
            </Fragment>
            
        )
    }
}

HowlDash.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HowlDash); 