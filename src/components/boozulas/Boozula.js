import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { addCheers, removeCheers } from '../../redux/actions/dataActions';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EditBoozulaImage from './EditBoozulaImage';

// Icons

// Components
import EmptyBoozula from './EmptyBoozula';
import EditBoozDetails from './EditBoozDetails';
import ViewBoozulaDetails from './ViewBoozulaDetails';
import ToastDialog from './ToastDialog';
import CheersButton from './CheersButton';

const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#263238",
    padding: '16px'
  },
  content: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #f4db9d",
    borderRight: "2px solid #f4db9d",
    borderBottom: "2px solid #f4db9d",
    margin: "8px 8px 8px 0",
    backgroundColor: "#263238"
  },
  image: {
    margin: "8px 0 8px 8px",
    minWidth: 120,
    maxHeight: 120,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #f4db9d",
    borderLeft: "2px solid #f4db9d",
    borderBottom: "2px solid #f4db9d"
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
        userAlias,
        userClozang,
        boozImage,
        createdAt,
        ingredients,
        preparation,
        drinkWare,
        cheersCount,
        toastCount,
        boozId,
        garnish
      },
      user: {
        authenticated,
        credentials: { clozang }
      }
    } = this.props;
    const deleteButton = authenticated && userClozang === clozang ? (
      <EmptyBoozula boozId={boozId}/>
    ) : null
    const imageUpdater = authenticated && userClozang === clozang ? (
      <EditBoozulaImage boozId={boozId}/>
    ) : null
    const infoUpdater = authenticated && userClozang === clozang ? (
      <EditBoozDetails 
      boozId={boozId}
      drinkName={drinkName}
      mainAlcohol={mainAlcohol}
      ingredients={ingredients}
      preparation={preparation}
      drinkWare={drinkWare}
      garnish={garnish}
      boozImage={boozImage}
      />
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia image={boozImage} title="Drink" className={classes.image} />
        <CardContent className={classes.content}>
        <Typography variant="h5" className="boozTitle2"><strong>:{drinkName.toUpperCase()}:</strong></Typography>
          <span><ViewBoozulaDetails boozId={boozId} userAlias={userAlias} userClozang={userClozang}/></span>
          <Typography
            variant="body2"
            component={Link}
            className="rust foam"
            to={`/${userClozang}`}
          >
            <strong>>{userAlias}</strong>
          </Typography>
          
          <hr className="bar-separator-booz"/>
          <Typography variant="body2" className="foam">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <hr className="bar-separator-booz"/>
          {imageUpdater}
          {infoUpdater}
          <hr className="bar-separator-booz"/>

          <CheersButton boozId={boozId}/>
          <span className="foam">{cheersCount}</span>
          <ToastDialog boozId={boozId} userAlias={userAlias} userClozang={userClozang} openDialog={this.props.openDialog}/>
          <span className="foam">{toastCount}</span>
          <Typography variant="body1" className="foam">
            <strong className="rusty">Main Alcohol:</strong> {mainAlcohol}
          </Typography>
          {deleteButton}
        </CardContent>
      </Card>
    );
  }
}

Boozula.propTypes = {
  addCheers: PropTypes.func.isRequired,
  removeCheers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  boozula: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  addCheers,
  removeCheers
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Boozula));
