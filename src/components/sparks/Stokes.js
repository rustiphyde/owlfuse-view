import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.themeMinusPalette,
  stokeImg: {
    maxWidth: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: '16px 0 16px 0',
    marginLeft: '32px',
    border: '3px solid #ff9800'
},
stokeData: {
    marginLeft: 16,
    width: 176,
    padding: 16,
    borderRadius: '16px 0 16px 0',
    borderTop: '3px solid #ff9800',
    borderBottom: '3px solid #ff9800'
},
});
class Stokes extends Component {
  render() {
    const { classes, stokes } = this.props;
    return (
      <Grid container>
        {stokes.map((stoke, index) => {
          const { body, createdAt, userImage, klozang, alias } = stoke;
          return (
            <Fragment key={createdAt}>
            <hr className="bar-separator"/>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={3}>
                    <img
                      src={userImage}
                      alt="Stoke"
                      className={classes.stokeImg}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.stokeData}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/user/>${klozang}`}
                        color="primary"
                      >
                        <strong>>{alias}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD, YYYY')}
                      </Typography>
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr className="bar-separator"/>
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
