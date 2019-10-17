import React, { Fragment } from 'react';
import NoImg from '../images/No-owlfuse-pic.png';
import PropTypes from 'prop-types';
import OwlFuseButton from './OwlFuseButton';

// MUI Components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import HeatIcon from '../components/icons/HeatIcon';
import StokeIcon from '../components/icons/StokeIcon';

const styles = (theme) => ({
  card: {
    // maxWidth: '98vw',
    position: "relative",
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#263238"
  },
  cardContent: {
    padding: 25,
    width: 600,
    flexDirection: 'column',
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #ff9800",
    borderRight: "2px solid #ff9800",
    margin: "8px 8px 8px 0",
    backgroundColor: "#fff"
  },
  cover: {
    margin: "8px 0 8px 8px",
    minWidth: 112,
    maxHeight: 112,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    borderTop: "2px solid #ff9800",
    borderLeft: "2px solid #ff9800",
    borderBottom: "2px solid #ff9800"
  },
  alias: {
    marginTop: 8,
    width: '160px',
    height: '20px',
    backgroundColor: '#263238',
    marginBottom: 10
  },
  date: {
    height: 12,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 8
  },
  fullLine: {
    height: 12,
    width: '90%',
    marginBottom: 8,
    backgroundColor: '#263238'
  },
  halfLine: {
    height: 12,
    width: '45%'
  }

})

const SparkSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 6 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.alias} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
        <OwlFuseButton>
          <HeatIcon color="primary"/>
        </OwlFuseButton>
        <span>?</span>
        <OwlFuseButton>
          <StokeIcon color="primary"/>
        </OwlFuseButton>
        <span>?</span>
      </CardContent>
    </Card>
  ))

  return <Fragment>{content}</Fragment>
}

SparkSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SparkSkeleton);