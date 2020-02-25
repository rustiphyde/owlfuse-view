import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = {

}

class FuseRequest extends Component {
    render(){
        const { classes, fuserequest: {
            sender, requested, sentAt, accepted, rejected
        } } = this.props;
        return(
            <div>{sender} sent you a fuse request</div>
        )
    }
}

FuseRequest.propTypes = {
    classes: PropTypes.object.isRequired,
    fuserequest: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(withStyles(styles)(FuseRequest));