import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux Firestore
import { useFirestoreConnect } from 'react-redux-firebase';

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
import FuseRequestIcon from './icons/FuseRequestIcon';
import AcceptRequestIcon from './icons/AcceptRequestIcon';
import RejectRequestIcon from './icons/RejectRequestIcon';
import InfernalIcon from './icons/InfernalIcon';
// Redux
import { connect, useSelector } from "react-redux";
import { markSizzlesRead } from "../redux/actions/userActions";


const Sizzles = (props) => {
  

  const [ anchorEl, setAnchorEl ] = useState(null);

  useFirestoreConnect({ collection: "Sizzles", orderBy: ["createdAt", "desc"]});
  const sizzles = useSelector(state => state.firestore.ordered.Sizzles);

  const handleOpen = event => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuOpened = () => {
    let unreadSizzleIds = sizzles
      .filter(sizz => !sizz.read && sizz.recipient === props.clozang)
      .map(sizz => sizz.sizzleId);
    props.markSizzlesRead(unreadSizzleIds);
  }

    dayjs.extend(relativeTime);

    let sizzleIcon;
    if (sizzles && sizzles.length > 0 ) {
      (sizzles.filter(sizz => sizz.read === false && sizz.recipient === props.clozang).length > 0) 
        ? (sizzleIcon = (
            <Badge
              badgeContent= {
                (sizzles.filter(sizz => sizz.read === false && sizz.recipient === props.clozang).length)
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
          if( sizz.recipient === props.clozang) {
            {
              const verb =
                sizz.type === "heat"
                  ? `${sizz.sender} added heat to your spark`
                  : sizz.type === "stoke"
                  ? `${sizz.sender} stoked your spark`
                  : sizz.type === "cheers"
                  ? `${sizz.sender} added a cheers to your boozula`
                  : sizz.type === "toast"
                  ? `${sizz.sender} toasted your boozula` 
                  : sizz.type === "fire"
                  ? "Your spark has ignited into a fire"
                  : sizz.type === "infernal"
                  ? "YOUR SPARK JUST WENT WENT INFERNAL!!"
                  : sizz.type === "request"
                  ? `${sizz.sender} sent you a fuse request`
                  : sizz.type === "accept"
                  ? `${sizz.sender} accepted your fuse request` 
                  : `${sizz.sender} rejected your fuse request`;
    
                  const time = dayjs(sizz.createdAt).fromNow();
    
                  const iconColor = sizz.read ? "primary"
                   : "secondary";
    
                  const icon =
                  sizz.type === "heat" ? (
                  <HeatIcon color={iconColor} style={{ marginRight: 10 }} />)
                   : sizz.type === "stoke" ? (
                  <StokeIcon color={iconColor} style={{ marginRight: 10 }} />)
                   : sizz.type === "cheers" ? (
                   <CheersIcon color={iconColor} style={{ marginRight: 10 }} />)
                   : sizz.type === "toast" ? (
                  <ToastIcon color={iconColor} style={{ marginRight: 10 }} />)
                   : sizz.type === "request" ? (
                  <FuseRequestIcon color={iconColor} style={{ marginRight: 10 }} />)
                  : sizz.type === "accept" ? (
                  <AcceptRequestIcon color={iconColor} style={{ marginRight: 10 }} />) 
                    : sizz.type === "reject" ? (
                  <RejectRequestIcon color={iconColor} style={{ marginRight: 10 }} />) 
                  : sizz.type === "infernal" ? (
                    <InfernalIcon color={iconColor} style={{ marginRight: 10 }} />) 
                  : (                
                  <FireIcon color={iconColor} style={{ marginRight: 10 }} />);
                
                  return (
                <MenuItem
                  key={sizz.createdAt}
                  onClick={handleClose}
                  style={{ backgroundColor: "#fefaf4" }}
                >
                  {icon}{
                    sizz.type === "heat"
                    || sizz.type === "stoke" 
                    || sizz.type === "fire" 
                    || sizz.type === "infernal" ? (
                      <Typography
                    component={Link}
                    style={{ fontSize: ".75rem" }}
                    color={iconColor}
                    variant="body1"
                    to={`/${sizz.recipient}/spark/${sizz.sizzleId}`}
                  > {verb} {time}
                  </Typography>
                    ) :
                      sizz.type === "cheers" 
                      || sizz.type === "toast" ? (
                        <Typography
                    component={Link}
                    style={{ fontSize: ".75rem" }}
                    color={iconColor}
                    variant="body1"
                    to={`/${sizz.recipient}/boozula/${sizz.sizzleId}`}
                  > {verb} {time}
                  </Typography>
                    ) : (
                      <Typography
                    component={Link}
                    style={{ fontSize: ".75rem" }}
                    color={iconColor}
                    variant="body1"
                    to={`/${sizz.sender}`}
                  > {verb} {time}
                  </Typography>
                    )
                  }
                  
                </MenuItem>
              ) }
          }
        }) ) : (
        <MenuItem style={{ backgroundColor: "#fefaf4", fontFamily: 'Baloo, cursive' }} onClick={handleClose}>You have no sizzles yet</MenuItem>
);

    return (
      <Fragment>
        <Tooltip title="SIZZLES">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleOpen}
          >
            {sizzleIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onEntered={onMenuOpened}
        > 
        <div style={{backgroundColor: "#263238", textAlign: "center"}}>
        <strong style={{color: "#ff9800"}}>SIZZLES</strong>
        </div>          
          {sizzlesMarkup}
        </Menu>
      </Fragment>
    );
  }

Sizzles.propTypes = {
  markSizzlesRead: PropTypes.func.isRequired,
  clozang: PropTypes.string,
  sizzles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  clozang: state.user.credentials.clozang,
  auth: state.firebase.auth
});

export default connect(mapStateToProps, { markSizzlesRead })(Sizzles);
