import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
// Icons

const styles = {
  card: {
    // position: 'relative',

    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#ff9800 !important"
  },
  content: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #37474f",
    borderRight: "2px solid #37474f",
    borderBottom: "2px solid #37474f",
    borderLeft: "2px solid #ff9800",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fefaf4"
  },
  image: {
    margin: "8px 0 8px 8px",
    minWidth: 120,
    maxHeight: 120,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #37474f",
    borderLeft: "2px solid #37474f",
    borderBottom: "2px solid #37474f"
  }
};

class Infernal extends Component {
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      infernal: {
        userClozang,
        userAlias,
        userImage,
        heatCount,
        stokeCount,
        emberCount,
        body,
        createdAt,
        infernalId
      },
      user: {
        authenticated,
        credentials: { alias }
      }
    } = this.props;        
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            color="primary"
            component={Link}
            to={`/user/${userClozang}`}
          >
            <strong>>{userAlias}</strong>
          </Typography>
          <Typography variant="body2" color="secondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            <strong>{body}</strong>
          </Typography>
          <span>{heatCount}</span>
          &emsp;
          <span>{stokeCount}</span>
        </CardContent>
      </Card>
    );
  }
}

Infernal.propTypes = {
  user: PropTypes.object.isRequired,
  infernal: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(withStyles(styles)(Infernal));
