import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  toastImg: {
    maxWidth: 64,
    height: 64,
    objectFit: 'cover',
    borderRadius: '16px 0 16px 0',
    marginLeft: '32px',
    border: '3px solid #f4db9d'
},
toastData: {
    marginLeft: 16,
    width: 'auto',
    padding: '8px 16px',
    borderRadius: '16px 0 16px 0',
    borderTop: '3px solid #f4db9d',
    borderBottom: '3px solid #f4db9d',
    borderRight: '1px solid #f4db9d',
    borderLeft: '1px solid #f4db9d'
},
};
class Toasts extends Component {
  render() {
    const { classes, toasts } = this.props;
    return (
      <Grid container>
        {toasts.map((toast) => {
          const { body, createdAt, userImage, userClozang } = toast;
          return (
            <Fragment key={createdAt}>
            <hr className="bar-separator"/>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={3}>
                    <img
                      src={userImage}
                      alt="Toast"
                      className={classes.toastImg}
                    />
                  </Grid>
                  <Grid item sm={8}>
                    <div className={classes.toastData}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={`/${userClozang}`}
                        color="primary"
                      >
                        <strong className="foam rust">{userClozang}</strong>
                      </Typography>
                      <Typography variant="body2" className="foam">
                        {dayjs(createdAt).format('h:mm a, MMMM D, YYYY')}
                      </Typography>
                      <hr className="bar-separator"/>
                      <Typography variant="body1" className="foam">{body}</Typography>
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

Toasts.propTypes = {
  toasts: PropTypes.array.isRequired
};

export default withStyles(styles)(Toasts);
