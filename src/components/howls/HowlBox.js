import React, { Component, fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchUserHowls } from '../../redux/actions/dataActions';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = {

}

class HowlBox extends Component {

    state = {
        howls: null
    }

    componentDidMount(){
        this.props.fetchUserHowls();
    }


    render(){

const { classes, howls } = this.props;

        return(<div>Hi</div>)
    }
}

HowlBox.propTypes = {
    classes: PropTypes.object.isRequired,
    howls: PropTypes.object.isRequired,
    fetchUserHowls: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    howls: state.howls
});

mapActionsToProps = {
    fetchUserHowls
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HowlBox));