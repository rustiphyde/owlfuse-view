import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons


// Components


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
    borderBottom: "2px solid #ff9800",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fefaf4"
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
  },
  name: {
    textAlign: "center",
    textDecoration: "underline"
  },
  icon: {
    fontSize: '3rem'
  },
  editButton: {
    position: 'absolute',
    left: '98%',
    top: '7%'
  }
}

class Boozula extends Component {
  
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      boozula: {
        drinkName,
        mainAlcohol,
        alias,
        boozang,
        boozImage,
        createdAt,
        ingredients,
        preparation,
        drinkWare,
        cheersCount,
        toastCount,
        firstCandle,
        boozId
      },
      user: {
        authenticated,
        credentials: { clozang }
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia image={boozImage} title="Drink" className={classes.image} />
        <CardContent className={classes.content}>
        <Typography variant="h5" color="secondary"><strong>{drinkName}</strong></Typography>
          <Typography
            variant="body2"
            component={Link}
            to={`/users/${clozang}`}
          >
            <strong>>{alias.replace(/\s/g, "-")}</strong>
          </Typography>
          
          <hr />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <hr />

          <Typography variant="body1" color="primary">
            <strong>Main Alcohol:</strong> {mainAlcohol}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Boozula.propTypes = {
  user: PropTypes.object.isRequired,
  boozula: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Boozula));