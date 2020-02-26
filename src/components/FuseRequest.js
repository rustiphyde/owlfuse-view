import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const styles = {
    paper: {
        backgroundColor: "#263238",
        color: "#f4db9d",
        height: "3rem",
        borderRadius: "16px 0 16px 0",
        padding: "16px",
        margin: "6px",
        '&:hover': {
            color: "#f4db9d !important"
        }
    }
}

class FuseRequest extends Component {
    render(){
        const { classes, fuserequest: {
            sender, requested, sentAt, accepted, rejected
        } } = this.props;
        
        return(
            <Paper className={classes.paper}><Typography
            variant="h6"
            component={Link}
            className="foam orange"
            to={`/${sender}`}
          ><strong>{sender}</strong></Typography></Paper>
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