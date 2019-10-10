import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// Mui Components
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

// Icons
import SizzleIcon from "./icons/SizzleIcon";
import HeatIcon from "./icons/HeatIcon";
import ToastIcon from "./icons/ToastIcon";
import CheersIcon from "./icons/CheersIcon";
import StokeIcon from "./icons/StokeIcon";
import FireIcon from "./icons/FireIcon";

// Redux
import { connect } from "react-redux";
import { markSizzlesRead, markClinksRead } from "../redux/actions/userActions";

class SizzlesAndClinks extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadSizzleIds = this.props.sizzles
      .filter(sizz => !sizz.read)
      .map(sizz => sizz.sizzleId);
    this.props.markSizzlesRead(unreadSizzleIds);

    let unreadClinkIds = this.props.clinks
      .filter(clink => !clink.read)
      .map(clink => clink.clinkId);
    this.props.markClinksRead(unreadClinkIds);
  };
  render() {
    const { sizzles, clinks } = this.props;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let sizzleIcon;
    if ( sizzles.length > 0 || clinks.length > 0) {
      (sizzles.filter(sizz => sizz.read === false).length > 0) ||
      (clinks.filter(clink => clink.read === false).length > 0)
        ? (sizzleIcon = (
            <Badge
              badgeContent= {
                (sizzles.filter(sizz => sizz.read === false).length) +
                (clinks.filter(clink => clink.read === false).length)
              }
              className="rusty"
            >
              <SizzleIcon />
            </Badge>
          ))
        : (sizzleIcon = <SizzleIcon />);
    } else {
      sizzleIcon = <SizzleIcon />;
    }

    let sizzlesMarkup =
      sizzles && sizzles.length > 0 ? (
        sizzles.map(sizz => {
          const verb =
            sizz.type === "heat"
              ? "added heat to"
              : sizz.type === "stoke"
              ? "stoked"
              : "ignited";
          const time = dayjs(sizz.createdAt).fromNow();
          const iconColor = sizz.read ? "primary" : "secondary";
          const icon =
            sizz.type === "heat" ? (
              <HeatIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : sizz.type === "stoke" ? (
              <StokeIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <FireIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem
              key={sizz.createdAt}
              onClick={this.handleClose}
              style={{ backgroundColor: "#f4db9d" }}
            >
              {icon}
              <Typography
                component={Link}
                style={{ fontSize: ".75rem" }}
                color={iconColor}
                variant="body1"
                to={`>${sizz.recipient
                  .replace(/\s/g, "-")
                  .toLowerCase()}/spark/${sizz.sparkId}`}
              >
                {sizz.sender} {verb} your spark {time}!
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem style={{ backgroundColor: "#f4db9d", fontFamily: 'Baloo, cursive' }} onClick={this.handleClose}>You have no sizzles yet</MenuItem>
      );

    let clinksMarkup =
      clinks && clinks.length > 0 ? (
        clinks.map(clink => {
          const verb =
            clink.type === "cheers" ? "added a cheers to" : "toasted";
          const time = dayjs(clink.createdAt).fromNow();
          const iconColor = clink.read ? "primary" : "secondary";
          const icon =
            clink.type === "cheers" ? (
              <CheersIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ToastIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem
              key={clink.createdAt}
              onClick={this.handleClose}
              style={{ backgroundColor: "#f4db9d" }}
            >
              {icon}
              <Typography
                component={Link}
                color={iconColor}
                style={{ fontSize: ".75rem" }}
                variant="body1"
                to={`/>${clink.recipient
                  .replace(/\s/g, "-")
                  .toLowerCase()}/boozula/${clink.boozId}`}
              >
                {clink.sender} {verb} your spark {time}!
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem  style={{ backgroundColor: "#f4db9d", fontFamily: 'Baloo, cursive' }} onClick={this.handleClose}>You have no clinks yet</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip title="SIZZLES & CLINKS">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {sizzleIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          <strong>SIZZLES</strong>
          {sizzlesMarkup}
          <strong>CLINKS</strong>
          {clinksMarkup}
        </Menu>
      </Fragment>
    );
  }
}

SizzlesAndClinks.propTypes = {
  markSizzlesRead: PropTypes.func.isRequired,
  markClinksRead: PropTypes.func.isRequired,
  sizzles: PropTypes.array.isRequired,
  clinks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  sizzles: state.user.sizzles,
  clinks: state.user.clinks
});

export default connect(
  mapStateToProps,
  { markSizzlesRead, markClinksRead }
)(SizzlesAndClinks);
