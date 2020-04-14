import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import HowlPostIcon from '../icons/HowlPostIcon';
import { connect } from 'react-redux';
import { postHowl, fetchFuserHowls } from '../../redux/actions/dataActions';




const styles = {

}

class PostHowl extends Component{
state = {
    howls: null
}   
    componentDidMount(){
        this.props.fetchFuserHowls(this.props.data.fuser.fuser);
    }

    postHowl = () => {
        this.props.postHowl(this.props.data.fuser.fuser,({ howlBody: this.props.howlBody }));
        setTimeout(() => this.props.fetchFuserHowls(this.props.data.fuser.fuser), 500);
    }

    consoleLogger = () => {
        console.log("Can't post a silent howl");
    }

    render(){

        const { classes } = this.props;
        const { fuser } = this.props.data.fuser;
        let buttonMarkup = fuser ? (
            <OwlFuseButton tip="POST HOWL" onClick={this.postHowl}>
                <HowlPostIcon className="icon2 foam orange"/>
            </OwlFuseButton>
        ) : (<OwlFuseButton tip="OPEN A HOWL TO USE THIS BUTTON" onClick={this.consoleLogger}>
            <HowlPostIcon className="icon2" />
            </OwlFuseButton>)
        return(
            <Fragment>
                {buttonMarkup}
            </Fragment>
        )
    }
}

PostHowl.propTypes = {
    classes: PropTypes.object.isRequired,
    howlBody: PropTypes.string.isRequired,
    howler: PropTypes.string,
    postHowl: PropTypes.func.isRequired,
    fuser: PropTypes.string,
    data: PropTypes.object.isRequired,
    fetchFuserHowls: PropTypes.func.isRequired,
    howls: PropTypes.array
}

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { postHowl, fetchFuserHowls })(withStyles(styles)(PostHowl));