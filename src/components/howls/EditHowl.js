import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, Avatar, Tooltip } from '@material-ui/core';
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
    },
    userSentPic: {
        float: 'right',
        margin: '6px 16px',
        border: '1.5px solid #ff9800'
    }
  });

class EditHowl extends Component{
    state = {
        howlBody: "",
        open: false
    }

    handleLongPress = () => {
        this.longPressTimer = setTimeout(() => this.handleOpen(), 1500);
    }

    handleLongRelease = () => {
        clearTimeout(this.longPressTimer);
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.setState({
            howlBody: this.props.howl.howlBody
        });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      componentDidMount() {
        this.setState({
            howlBody: this.props.howl.howlBody 
        });
        console.log(this.props.howl);
      }
    
      handleChange = event => {
        this.setState({
          howlBody: event.target.value
        });
      };
      handleSubmit = () => {
        const howlDetails = {
          howlBody: this.state.howlBody
        };
        this.props.editHowl(this.props.howl.howlId, howlDetails, this.props.howl.sentTo);
        this.handleClose();
      };

    render(){

        const { classes, howl } = this.props;
    return (
      <Fragment>
        <Tooltip title="HOLD TO EDIT HOWL">
        <Avatar src={this.props.howl.avatar}
        onTouchStart={this.handleLongPress}
        onTouchEnd={this.handleLongRelease}
        onMouseDown={this.handleLongPress}
        onMouseUp={this.handleLongRelease}
        onMouseLeave={this.handleLongRelease}
        className={classes.userSentPic}
        >

        </Avatar>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxwidth="sm"
          className={classes.dialog}
        >
          <DialogTitle variant="h5" className={classes.title}>
            <HowlEditIcon className="icon2"/><strong>EDIT YOUR HOWL</strong>
          </DialogTitle>
          <DialogContent className="rust-border">
            <form className={classes.form}>
              <TextField
                name="howlBody"
                type="text"
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
              <strong className="orange">CANCEL</strong>
            </Button>
            <Button onClick={this.handleSubmit} color="primary" variant="contained">
              <strong className="orange">SAVE</strong>
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditHowl.propTypes = {
    classes: PropTypes.object.isRequired,
    editHowl: PropTypes.func.isRequired,
    howl: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps,{ editHowl })(withStyles(styles)(EditHowl));



