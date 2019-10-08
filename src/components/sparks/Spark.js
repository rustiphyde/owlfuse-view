import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Components
import ExtinguishSpark from './ExtinguishSpark';
import SparkBox from './SparkBox';
import HeatButton from './HeatButton';

// Icons
import FireIcon from "../icons/FireIcon";

// Redux
import { connect } from "react-redux";
import { addHeat, removeHeat } from "../../redux/actions/dataActions";

const styles = {
  card: {
    // maxWidth: '98vw',
    position: "relative",
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#37474f"
  },
  content: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #ff9800",
    borderRight: "2px solid #ff9800",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fff"
  },
  image: {
    margin: "8px 0 8px 8px",
    minWidth: 112,
    maxHeight: 112,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800"
  }
};

class Spark extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      spark: {
        userAlias,
        userImage,
        heatCount,
        stokeCount,
        body,
        createdAt,
        fire,
        sparkId
      },
      user: { authenticated,  credentials: { alias }   }
    } = this.props;
    const deleteButton = authenticated && userAlias === alias ? (
      <ExtinguishSpark sparkId={sparkId}/>
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Candle" className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            color="primary"
            component={Link}
            to={`/users/${userAlias}`}
          >
            <strong>>{userAlias}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body2" color="primary" className="breaks">
            <b>{body}</b>
          </Typography>
          <HeatButton sparkId={sparkId}/>
          <span>{heatCount}</span>
          <SparkBox sparkId={sparkId} userAlias={userAlias}/>
          <span>{stokeCount}</span>
          <span>{deleteButton}</span>
        </CardContent>
        {fire === true && <FireIcon color="secondary" className="icon9" />}
      </Card>
    );
  }
}

Spark.propTypes = {
  addHeat: PropTypes.func.isRequired,
  removeHeat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  spark: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  addHeat,
  removeHeat
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Spark));
