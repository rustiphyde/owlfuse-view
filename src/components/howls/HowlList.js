import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import Howler from './Howler';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getFusers } from '../../redux/actions/dataActions';

const styles = {
    listItem: {
        borderBottom: "1px solid #ff9800",
        width: '100%'
	},
    ava: {
        backgroundColor: "#ff9800",
        color: "#263238"  
      },
    tar: {
        backgroundColor: '#f4db9d',
        color: "#263238"
    },
      scroll: {
        overflowY: 'scroll',
        height: '18rem',
        width: '100%',
        overflowX: 'hidden'

    },
	fusers: {
		color: "#f4db9d",
    }
}

class HowlList extends Component{
    state = {
        fusers: null
    }

    componentDidMount(){
        this.props.getFusers();
    }

    render(){

        const { classes } = this.props;
        const { loading, fusers, fuser } = this.props.data;

        let howlersMarkup = !loading ? (
        fusers && fusers.length > 1 ? (
            fusers.filter(fuse => fusers.indexOf(fuse) !== 0).map((howlr) =>
                    <Fragment key={fusers.indexOf(howlr) + 1}>
                    <ListItem button key={howlr} className={classes.listItem}>
                <ListItemAvatar key={fusers.indexOf(howlr)}>
					<Avatar className={ this.props.data.fuser.fuser === howlr ? classes.tar : classes.ava} key={howlr + howlr}>
                    {howlr.slice(1,3)}
                    </Avatar>
				</ListItemAvatar>
                <ListItem key={howlr + fusers.indexOf(howlr).toString()}>
                    <Howler key={howlr + "amigo"} howler={howlr} closeMenu={this.props.closeMenu}/>
                </ListItem>
                </ListItem>
                <hr className="bar-separator" />
                </Fragment>    
            )
        ) : (<Fragment>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar>0</Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.fusers}>
                        <strong>
                            You do not currently have any active howls to open
                        </strong>
                    </ListItemText>
                </ListItem>
                <hr className="bar-separator" />
        </Fragment>   )
        ) : (
            <CircularProgress
            color="secondary"
            size={80}
            className="candle centered"
        />
        );
        return(
            <Fragment>
            <Typography><strong className="candle centered rusty">FUSERS</strong></Typography>
            <hr className="bar-separator"/>
            <hr className="bar-separator"/>
            <List className={classes.scroll}>
                {howlersMarkup}
            </List>
            </Fragment>
        )
    }
}

HowlList.propTypes = {
    classes: PropTypes.object.isRequired,
    howls: PropTypes.array,
    getFusers: PropTypes.func.isRequired,
    closeMenu: PropTypes.func

}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    getFusers
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HowlList));
