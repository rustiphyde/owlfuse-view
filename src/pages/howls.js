import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = {

}

class howls extends Component {
    render(){
        const { classes } = this.props;

        return(<div>Coming Soon</div>)
    }
}

howls.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
});

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(howls));