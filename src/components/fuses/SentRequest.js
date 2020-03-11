import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import CancelButton from './CancelButton';

const styles = {
    paper: {
        backgroundColor: "#263238",
        position: 'relative',
        color: "#f4db9d",
        height: "3rem",
        borderRadius: "16px 0 16px 0",
        padding: "16px",
        margin: "8px",
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'hidden',
        '&:hover': {
            color: "#f4db9d !important"
        }
    }
}

class SentRequest extends Component {
    render(){
        const { classes, sentrequest: {
            sender, requested, sentAt, accepted, rejected, reqId
        } } = this.props;
        
        return(
            <Paper className={classes.paper}><Typography
            variant="h6"
            component={Link}
            className="foam orange"
            to={`/${requested}`}
          ><strong>{requested}</strong></Typography>
          <CancelButton className={classes.aBtn} reqId={reqId}/>
          </Paper>
        )
    }
}

SentRequest.propTypes = {
    classes: PropTypes.object.isRequired,
    sentrequest: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(withStyles(styles)(SentRequest));