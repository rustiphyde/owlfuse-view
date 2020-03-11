import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const styles = {
    paper: {
        backgroundColor: "#263238",
        color: "#f4db9d",
        height: "3rem",
        borderRadius: "16px 0 16px 0",
        padding: "16px",
        margin: "6px",
        overflow: 'hidden',
        '&:hover': {
            color: "#f4db9d !important"
        }
    }
}

class Fuser extends Component {

    render(){

        const { classes, fuser } = this.props;

        return(
            <Paper className={classes.paper}><Typography
            variant="h6"
            component={Link}
            className="foam orange"
            to={`/${fuser}`}
          ><strong>{fuser}</strong></Typography></Paper>
        )
    }
}

Fuser.propTypes = {
    classes: PropTypes.object.isRequired,
    fuser: PropTypes.string.isRequired
}

export default withStyles(styles)(Fuser);