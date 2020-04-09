import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//MUI Stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {

}

class SenderHowling extends Component{
    state = {
        howling: {}
    }

    render(){
        dayjs.extend(relativeTime);
        const { classes, howling: {
            createdAt, docKey, howlBody, sentBy, receiverHasread, sentTo, avatar
        }} = this.props;

        return(
            <Fragment>
                <Paper>
                    <Grid container>
                        <Grid item sm={2}>
                            <Avatar src={avatar}/>                                
                        </Grid>
                        <Grid item sm={10}>
                    <Typography>
              {howlBody}
          </Typography>
          <Typography variant="body2" className="foam">
            {dayjs(createdAt).fromNow()}
          </Typography>
                
                </Grid>
                    </Grid>
                    </Paper>
            </Fragment>
        )
    }
}

SenderHowling.propTypes = {
    classes: PropTypes.object.isRequired,
    howling: PropTypes.object.isRequired
}


export default withStyles(styles)(SenderHowling);