import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSpark, shareEmber } from '../../redux/actions/dataActions';
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import {
	CircularProgress,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Dialog,
	Paper,
	Typography,
	Grid
} from "@material-ui/core";
import EmberIcon from '../icons/EmberIcon';

const styles = {

}

class ShareEmber extends Component {

    state = {
        open: false,
        body: "",
    }

    render(){

        const { classes } = this.props;

        return(
            <div></div>
        )
    }
}

ShareEmber.propTypes = {
    shareEmber: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    getSpark: PropTypes.func.isRequired,
    emberId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { getSpark, shareEmber })(withStyles(styles)(ShareEmber));