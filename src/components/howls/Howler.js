import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';
import Typography from '@material-ui/core/Typography';
import { fetchSingleHowl, fetchHowlings } from '../../redux/actions/dataActions';
import HowlIcon from '../icons/HowlIcon';

const styles = {

}

class Howler extends Component{

    componentDidMount(){
        this.props.fetchSingleHowl(this.props.docKey);
    }

    openHowl = () => {
        this.props.fetchHowlings(this.props.docKey);
    }

    render(){
        const { classes, howler } = this.props;
        return(
            <Fragment>
                <Typography className={classes.text}>
        <strong className="foam orange" onClick={this.openHowl}>{howler}</strong>
                </Typography>
                <OwlFuseButton
                tip="OPEN HOWL"
                onClick={this.openHowl}
                >
                    <HowlIcon className="icon2 foam orange"/>
                </OwlFuseButton>
            </Fragment>
        )
    }
}

Howler.propTypes = {
    classes: PropTypes.object.isRequired,
    docKey: PropTypes.string.isRequired,
    howler: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    fetchSingleHowl: PropTypes.func.isRequired,
    fetcHHowlings: PropTypes.func
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps, { fetchSingleHowl, fetchHowlings })(withStyles(styles)(Howler));