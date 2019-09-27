import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    borderTop: "2px solid firebrick",
    borderRight: "2px solid firebrick",
    borderBottom: "2px solid firebrick",
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
    borderTop: "2px solid firebrick",
    borderLeft: "2px solid firebrick",
    borderBottom: "2px solid firebrick"
  }
};

class Fire extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      fire: {
        alias,
        clozang,
        userImage,
        heat,
        stokeCount,
        body,
        createdAt,
        sparkId,
        fireId
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
            <strong>>{alias}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
           {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="primary"><strong>{body}</strong></Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Fire);