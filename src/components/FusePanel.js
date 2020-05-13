import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from '../util/OwlFuseButton';

import OwlFuseLogo from './icons/OwlFuseLogo';

const styles = {

}

class FusePanel extends Component {
    render(){
        return(<OwlFuseButton
           tip="OPEN FUSE PANEL">
            <OwlFuseLogo className="foam orange icon13 needs-padding"/>
        </OwlFuseButton>);
    }
}

export default withStyles(styles)(FusePanel);