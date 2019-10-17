import React, { Fragment } from 'react';
import NoImg from '../images/blank-drink-pic.png';
import PropTypes from 'prop-types';
import OwlFuseButton from './OwlFuseButton';

// MUI Components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

// Icons
import CheersIcon from '../components/icons/CheersIcon';
import ToastIcon from '../components/icons/ToastIcon';
import ViewBoozIcon from '../components/icons/ViewBoozIcon';

const styles = (theme) => ({
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 0 16px 0",
    backgroundColor: "#263238",
    padding: '16px'
  },
  cardContent: {
    padding: 25,
    width: 600,
    borderRadius: "0 0 16px 16px",
    borderTop: "2px solid #f4db9d",
    borderRight: "2px solid #f4db9d",
    borderBottom: "2px solid #f4db9d",
    margin: "8px 8px 8px 0",
    backgroundColor: "#263238"
  },
  cover: {
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
  expandButton: {
    float: 'right'
  }
})

const BoozulaSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 3 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
      <Typography variant="h5" className="boozTitle2"><strong>:BOOZULA:</strong></Typography>
        <span><OwlFuseButton
        tipClassName={classes.expandButton}
        >
          <ViewBoozIcon className="icon2 rust foam" />
        </OwlFuseButton></span>
        <Typography
            variant="body2"
            className="foam">
            <strong>>Owl-Fuser</strong>
        </Typography>
        <hr className="bar-separator-booz"/>
        <Typography variant="body2" className="foam">
            ? days ago
          </Typography>
        <hr className="bar-separator-booz" />
        <hr className="bar-separator-booz"/>
        <OwlFuseButton>
          <CheersIcon className="foam icon2"/>
        </OwlFuseButton>
        <span className="foam">?</span>
        <OwlFuseButton>
          <ToastIcon className="foam icon6"/>
        </OwlFuseButton>
        <span className="foam">?</span>
        <Typography variant="body1" className="foam">
            <strong className="rusty">Main Alcohol:</strong> Alcohol
          </Typography>
      </CardContent>
    </Card>
  ))

  return <Fragment>{content}</Fragment>
}

BoozulaSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BoozulaSkeleton);