import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: 64,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(38px)',
      color: '#fff',
      '& + $track': {
        color: '#FF9800',
        backgroundColor: '#263238',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#fff',
      border: '6px solid #f4db9d',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    boxShadow: '1px 1px 1px 1px rgba(o, o, o, o.6)'
  },
  track: {
    borderRadius: 26 / 2,
    boxShadow: 'inset 1px 2px 2px 2px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ff9800',
    color: '#ff9800',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
});

class SilentChecked extends Component {


  render(){

    const { classes } = this.props;
    return(
      <Switch focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,        
      }}
      checked={true}
      onChange={this.props.toggleFunx}
    />
    )
  }
}

SilentChecked.propTypes = {
  toggleFunx: PropTypes.func.isRequired
}

export default withStyles(styles)(SilentChecked);