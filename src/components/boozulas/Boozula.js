import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
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
import CheersIcon from '../icons/CheersIcon';
import ToastIcon from '../icons/ToastIcon';

// Components
import EmptyBoozula from './EmptyBoozula';
import EditBoozDetails from './EditBoozDetails';
import ViewBoozulaDetails from './ViewBoozulaDetails';

const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#361002"
  },
  content: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #f4db9d",
    borderRight: "2px solid #f4db9d",
    borderBottom: "2px solid #f4db9d",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fefaf4"
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
  hasCheers = () => {
    if (
      this.props.user.cheers &&
      this.props.user.cheers.find(
        cheer => cheer.boozId === this.props.boozula.boozId
      )
    )
      return true;
    else return false;
  };
  addCheers = () => {
    this.props.addCheers(this.props.boozula.boozId);
  };
  removeCheers = () => {
    this.props.removeCheers(this.props.boozula.boozId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      boozula: {
        drinkName,
        mainAlcohol,
        alias,
        klozang,
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
    const deleteButton = authenticated && klozang === clozang ? (
      <EmptyBoozula boozId={boozId}/>
    ) : null
    const imageUpdater = authenticated && klozang === clozang ? (
      <EditBoozulaImage boozId={boozId}/>
    ) : null
    const infoUpdater = authenticated && klozang === clozang ? (
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
    const cheersButton = !authenticated ? (
      <OwlFuseButton tip="ADD CHEERS">
        <Link to="/login">
          <CheersIcon color="primary" className="icon8" />
        </Link>
      </OwlFuseButton>
    ) : this.hasCheers() ? (
      <OwlFuseButton tip="REMOVE CHEERS" onClick={this.removeCheers}>
        <CheersIcon className="icon8-2" />
      </OwlFuseButton>
    ) : (
      <OwlFuseButton tip="ADD CHEERS" onClick={this.addCheers}>
        <CheersIcon color="primary" className="icon8" />
      </OwlFuseButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia image={boozImage} title="Drink" className={classes.image} />
        <CardContent className={classes.content}>
        <Typography variant="h5" className="boozTitle2"><strong>:{drinkName.toUpperCase()}:</strong></Typography>
        <span><ViewBoozulaDetails boozId={boozId} alias={alias}/></span>
          <Typography
            variant="body2"
            component={Link}
            to={`/users/${clozang}`}
          >
            <strong>>{alias}</strong>
          </Typography>
          
          <hr />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <hr />
          {imageUpdater}
          {infoUpdater}
          <hr />

          {cheersButton}
          <span>{cheersCount}</span>
          <OwlFuseButton tip="TOASTS">
          <ToastIcon className="rusty" />
         </OwlFuseButton>
          <span>{toastCount}</span>
          <Typography variant="body1" color="primary">
            <strong>Main Alcohol:</strong> {mainAlcohol}
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
  classes: PropTypes.object.isRequired
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
