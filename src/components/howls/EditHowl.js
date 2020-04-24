import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button } from '@material-ui/core';
// Redux Stuff
import { connect } from "react-redux";
import { editHowl } from "../../redux/actions/dataActions";

import HowlEditIcon from '../icons/HowlEditIcon';

const styles = (theme) => ({
    ...theme.themeMinusPalette,
  
    dialog: {
      padding: 16,
      borderRadius: "32px"
    },
    form: {
      padding: 16
    },
    title: {
      color: "#ff9800",
      textAlign: "center"
    }
  });

class EditHowl extends Component{
    state = {
        howlId: "",
        howlBody: "",
        open: false
    }

    mapHowlDetailsToState = () => {
        this.mapHowlDetailsToState({
            howlBody: this.props.howlBody ? this.props.howlBody : ""
        });
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.mapHowlDetailsToState(this.props);
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      componentDidMount() {
        this.mapHowlDetailsToState(this.props);
      }
    
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = () => {
        const howlDetails = {
          howlBody: this.state.howlBody
        };
        this.props.editHowl(this.props.howlId, howlDetails);
        this.handleClose();
      };

    render(){

        const { classes } = this.props;
    return (
      <Fragment>
        <OwlFuseButton
          tip="EDIT YOUR HOWL"
          onClick={this.handleOpen}
        >
          <HowlEditIcon className="icon8 foam orange" />
        </OwlFuseButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxwidth="sm"
          className={classes.dialog}
        >
          <DialogTitle variant="h5" className={classes.title}>
            EDIT YOUR HOWL
          </DialogTitle>
          <DialogContent className="rust-border">
            <form className={classes.form}>
              <TextField
                name="howlBody"
                type="text"
                label="HOWL"
                multiline
                rows="3"
                placeholder="EDIT YOUR HOWL"
                className={classes.textField}
                value={this.state.howlBody}
                onChange={this.handleChange}
                fullWidth
              />              
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="contained">
              CANCEL
            </Button>
            <Button onClick={this.handleSubmit} color="primary" variant="contained">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditHowl.propTypes = {
    classes: PropTypes.object.isRequired,
    howlBody: PropTypes.string,
    howlId: PropTypes.string,
    editHowl: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    howl: state.data.howl,
    UI: state.UI
});

export default connect(mapStateToProps, editHowl )(withStyles(styles)(EditHowl));



