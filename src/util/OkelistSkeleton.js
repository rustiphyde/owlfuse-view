import React, { Fragment } from "react";
import PropTypes from "prop-types";
import OwlFuseButton from "./OwlFuseButton";

// MUI Components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// Icons
import ChoozByListIcon from "../components/icons/ChoozByListIcon";
import ViewSongIcon from "../components/icons/ViewSongIcon";
import EraseOkelistIcon from '../components/icons/EraseOkelistIcon';

const styles = theme => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 8,
    borderRadius: "16px 16px 16px 16px",
    backgroundColor: "#263238",
    textAlign: "center"
  },
  clef: {
    fontSize: "32px"
  },
  clef2: {
    fontSize: "20px",
    color: "#263238"
  },
  cardContent: {
    padding: 25,
    width: 800,
    borderRadius: "16px 16px 16px 16px",
    borderTop: "6px double #ff9800",
    borderBottom: "6px double #ff9800",
    margin: "8px 0 8px 0",
    backgroundColor: "#fefaf4"
  },
  deleteButton: {
    float: 'right'
}
});

const OkelistSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 6 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.cardContent}>
      <OwlFuseButton tip="ERASE THIS OKELIST"
                btnClassName ={classes.deleteButton}>
                <EraseOkelistIcon className="icon4 rusty"/>
                </OwlFuseButton>
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <Typography variant="h6">
          <strong className="rusty">
            <span>
              <span className={classes.clef}>𝄞</span>Okelist
            </span>
          </strong>
        </Typography>
        <hr className="bar-separator-oak" />
        <Typography variant="body2" className="rusty2">
          composed ? days ago
        </Typography>
        <Typography variant="body2">
          <span className={classes.clef2}>𝄆</span>
          <strong className="rusty">Compose an Okelist</strong>
          <span className={classes.clef2}>𝄇</span>
        </Typography>
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <hr className="bar-separator-oak" />
        <OwlFuseButton tip="CHOOZ">
          <ChoozByListIcon className="icon2 rusty" />
        </OwlFuseButton>
        <span>? SONGS</span>
        <OwlFuseButton tip="SONGS">
          <ViewSongIcon className="icon2 rusty" />
        </OwlFuseButton>
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

OkelistSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OkelistSkeleton);
