import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    position: 'relative',
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
        alias,
        clozang,
        userImage,
        heat,
        stokeCount,
        body,
        createdAt,
        sparkId
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Candle" className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${clozang}`}
          >
            <strong>>{alias.replace(/\s/g, "-")}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body2" color="primary"><b>{body}</b></Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Spark);