import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux Stuff
import { connect } from "react-redux";
import { addSong } from "../../redux/actions/dataActions";

const styles = {
  form: {
    backgroundColor: '#fefaf4 !important',
      borderRadius: 16,
      padding: 16,
    border: '6px double #ff9800',
    margin: '0 auto'
  },
  textField: {
    margin: "8px auto",
  },
  button: {
    margin: "20px auto",
    width: "144px",
    position: 'relative',
    color: '#ff9800'
  },
  gridItem: {
    textAlign: "center"
  }
};

class SongForm extends Component {
  state = {
    songTitle: "",
    songArtist: "",
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({ errors: nextProps.UI.errors });
      }
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({ 
            songTitle: '',
            songArtist: '',
            errors: {}
          });
      }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addSong(this.props.okeId, { 
      songTitle: this.state.songTitle,
      songArtist: this.state.songArtist,
      errors: this.state.errors
    });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const songFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.gridItem}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            name="songTitle"
            type="text"
            label="SONG TITLE"
            error={errors.songTitle ? true : false}
            helperText={errors.songTitle}            
            value={this.state.songTitle}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <TextField
            name="songArtist"
            type="text"
            label="SONG ARTIST"
            error={errors.songArtist ? true : false}
            helperText={errors.songArtist}            
            value={this.state.songArtist}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            ADD SONG
          </Button>
        </form>
      </Grid>
    ) : null;
    return songFormMarkup;
  }
}

SongForm.propTypes = {
  addSong: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  okeId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { addSong }
)(withStyles(styles)(SongForm));
