import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.themeMinusPalette,
  stokeData: {
    width: '100%',
    padding: '8px 16px',
    borderRadius: "16px 0 16px 0",
    backgroundColor: '#fefaf4'
  }, 
  stretch: {
    width: '100%'
  },
  avatar: {
    border: '2px solid #ff9800',
    borderRadius: '16px 0 16px 0'
  }
});
class Stokes extends Component {
  render() {
    const { classes, stokes } = this.props;
    return (
      <Grid container className="dark">
        {stokes.map((stoke) => {
          const { body, createdAt, userImage, userClozang } = stoke;
          return (
            <Fragment key={createdAt}>
              <hr className="bar-separator" />
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={12} className={classes.stretch}>
                    <div className={classes.stokeData}>
                      <span>
                        <Avatar className={classes.avatar} src={userImage}></Avatar>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={`/${userClozang}`}
                        color="primary"
                        className="orange"
                      >
                        <strong>{userClozang}</strong>
                      </Typography>
                        </span>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM D, YYYY")}
                      </Typography>
                      <Typography variant="body2" className="breaks">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr className="bar-separator" />
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Stokes.propTypes = {
  stokes: PropTypes.array.isRequired
};

export default withStyles(styles)(Stokes);
