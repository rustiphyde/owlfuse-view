import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from '../../util/OwlFuseButton';

import HowlIcon from '../icons/HowlIcon';

const styles = {

}

class HowlButton extends Component {
    render(){
        return(<OwlFuseButton
           tip="OPEN HOWLBOX">
            <HowlIcon className="foam orange icon14"/>
        </OwlFuseButton>);
    }
}

export default withStyles(styles)(HowlButton);