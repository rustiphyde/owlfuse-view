import React, { Component } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import EraseOkelist from './EraseOkelist';
import ListChoozer from './ListChoozer';
import OkeView from './OkeView';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
    oaktree: {
      color: '#263238'
    },
    card: {
      position: 'relative',
        display: "flex",
        marginBottom: 8,
        borderRadius: '16px 16px 16px 16px',
      backgroundColor: '#263238',
        textAlign: "center"
      },
      clef: {
        fontSize: '32px'
      },
      clef2: {
        fontSize: '20px',
        color: '#263238'
      },
      content: {
        padding: 25,
        width: 800,
        borderRadius: '16px 16px 16px 16px',
        borderTop: '6px double #ff9800',
        borderBottom: '6px double #ff9800',
        margin: '8px 0 8px 0',
        backgroundColor: '#fefaf4'
      }
  
};

class Okelist extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      okelist: {
        listName,
        description,
        userClozang,
        createdAt,
        okeId,
        songCount
      },
      user: { authenticated, credentials: { clozang }  }
    } = this.props;
    const deleteButton = authenticated && userClozang === clozang ? (
      <EraseOkelist okeId={okeId}/>
    ) : null;
    const okeListsMarkup = authenticated && userClozang === clozang ? (
      <Card className={classes.card}>
    <CardContent className={classes.content}>
      {deleteButton}
      <hr className="bar-separator-oak"/>
      <hr className="bar-separator-oak"/>
      <hr className="bar-separator-oak"/>
      <hr className="bar-separator-oak"/>
      <hr className="bar-separator-oak"/>
      <Typography variant="h6"><strong className="rusty"><span><span className={classes.clef}>𝄞</span> {listName}</span></strong></Typography>
      <hr className="bar-separator-oak"/>
      <Typography variant="body2" className="rusty2">
        composed {dayjs(createdAt).fromNow()}
      </Typography>
      <Typography variant="body2"><span className={classes.clef2}>𝄆 </span><strong className="rusty">{description}</strong><span className={classes.clef2}> 𝄇</span></Typography>
      <hr className="bar-separator-oak"/>
      <hr className="bar-separator-oak"/><hr className="bar-separator-oak"/>
      <ListChoozer okeId={okeId}/><span className="rusty">{songCount} SONGS</span>
      <OkeView okeId={okeId}/>
    </CardContent>
  </Card>
    ) : null;
    return okeListsMarkup;
  }
}

Okelist.propTypes = {
  user: PropTypes.object.isRequired,
  okelist: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Okelist));

