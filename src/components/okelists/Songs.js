import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.themeMinusPalette,
  songData: {
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: '#263238',
      padding: 16
  },
  frag: {
      backgroundColor: '#263238'
  }
});
class Songs extends Component {
  render() {
    const { classes, songs } = this.props;
    return (
      <Grid container className={classes.frag}>
        {songs.sort((a, b) => (a.songTitle > b.songTitle) ? 1 : -1).map((song) => {
          const { songTitle, songArtist } = song;
          return (
            <Fragment key={songTitle}>
              <Grid item sm={12}>
                <Grid container>
                  <Typography variant="body1" className={`${this.props.classes.songData} foam`}>. <strong>{songTitle}</strong> by <em className="rusty"><u>{songArtist}</u></em></Typography>
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

Songs.propTypes = {
  songs: PropTypes.array.isRequired
};

export default withStyles(styles)(Songs);
