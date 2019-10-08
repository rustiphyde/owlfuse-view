import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.themeMinusPalette,
  stokeImg: {
    maxWidth: 64,
    height: 64,
    objectFit: "cover",
    borderRadius: "16px 0 16px 0",
    marginLeft: "8px",
    border: "3px solid #ff9800"
  },
  stokeData: {
    width: 'auto',
    padding: '8px 16px',
    borderRadius: "16px 0 16px 0",
    backgroundColor: '#fefaf4'
  }
});
class Stokes extends Component {
  render() {
    const { classes, stokes } = this.props;
    return (
      <Grid container className="dark">
        {stokes.map((stoke) => {
          const { body, createdAt, userImage, userAlias } = stoke;
          return (
            <Fragment key={createdAt}>
              <hr className="bar-separator" />
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={3}>
                    <img
                      src={userImage}
                      alt="Stoke"
                      className={classes.stokeImg}
                    />
                  </Grid>
                  <Grid item sm={8}>
                    <div className={classes.stokeData}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={`/user/>${userAlias}`}
                        color="primary"
                        className="orange"
                      >
                        <strong>>{userAlias}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MM/DD/YY")}
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
