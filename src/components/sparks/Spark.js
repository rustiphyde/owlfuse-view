import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    position: 'relative',
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#37474f"
  },
  content: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderRight: "2px solid #ff9800",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fff"
  },
  image: {
    margin: "8px 0 8px 8px",
    minWidth: 120,
    maxHeight: 120,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800"
  }
};

class Spark extends Component {
  render() {
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
        <CardMedia image={userImage} title="Profile" className={classes.image} />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="secondary"
            component={Link}
            to={`/users/${clozang}`}
          >
            <strong>>{alias}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {createdAt}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Spark);