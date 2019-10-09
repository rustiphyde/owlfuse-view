import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// Mui Components
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

// Icons
import SizzleIcon from './icons/SizzleIcon';
import HeatIcon from './icons/HeatIcon';
import ToastIcon from './icons/ToastIcon';
import CheersIcon from './icons/CheersIcon';
import StokeIcon from './icons/StokeIcon';
import FireIcon from './icons/FireIcon';

// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

class SizzlesAndClinks extends Component {
  state = {
    anchorElement: null
  }
}

SizzlesAndClinks.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  sizzles: PropTypes.object.isRequired,
  clinks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  sizzles: state.user.sizzles,
  clinks: state.user.clinks
})

export default connect(mapStateToProps, { markNotificationsRead })(SizzlesAndClinks);