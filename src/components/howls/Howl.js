import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OwlFuseButton from '../../util/OwlFuseButton';
import { connect } from 'react-redux';


const styles = {

}

class Howl extends Component {
    
    state = {

    }



    render(){


        const { classes,  howl: { createdAt, docKey, howlCount, howlers } } = this.props;

        return(
            <div></div>
        )
    }
}

Howl.propTypes = {
    classes: PropTypes.object.isRequired,
    howl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, null)(withStyles(styles)(Howl));