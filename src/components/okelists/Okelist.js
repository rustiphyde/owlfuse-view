import React, { Component } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
    orange: {
      color: '#ff9800'
    },
    card: {
      position: 'relative',
        display: "flex",
        marginBottom: 8,
        borderRadius: '16px 0 16px 16px',
        backgroundColor: '#37474f'
      },
      clef: {
        fontSize: '32px'
      },
      clef2: {
        fontSize: '20px',
        color: '#ff9800'
      },
      content: {
        // textAlign: 'center',
        padding: 25,
        width: 800,
        borderRadius: '16px 0 16px 16px',
        borderTop: '2px solid #ff9800',
        borderRight: '2px solid #ff9800',
        borderLeft: '2px solid #37474f',
        margin: '8px 8px 8px 0',
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
        okeClozang,
        createdAt,
        okeId,
        songCount
      },
      user: { authenticated, credentials: { clozang }  }
    } = this.props;
    const okeListsMarkup = authenticated && okeClozang === clozang ? (
      <Card className={classes.card}>
    <CardContent className={classes.content}>
  
      <hr className="bar-separator"/>
      <hr className="bar-separator"/>
      <hr className="bar-separator"/>
      <hr className="bar-separator"/>
      <hr className="bar-separator"/>
      <Typography variant="h6" color="primary" className={classes.name}><strong><span className={classes.orange}><span className={classes.clef}>𝄞</span> {listName}</span></strong></Typography>
      <hr className="bar-separator"/>
      <Typography variant="body2" color="textSecondary">
        composed {dayjs(createdAt).fromNow()}
      </Typography>
      <Typography variant="body2" color="primary"><span className={classes.clef2}>𝄆</span> {description} <span className={classes.clef2}>𝄇</span></Typography>
      <hr className="bar-separator"/>
      <hr className="bar-separator"/><hr className="bar-separator"/>
      
      
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

