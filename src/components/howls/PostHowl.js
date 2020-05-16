import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OwlFuseButton from '../../util/OwlFuseButton';
import HowlPostIcon from '../icons/HowlPostIcon';
import { connect } from 'react-redux';
import { postHowl, increaseHowlCount, fetchFuserHowls } from '../../redux/actions/dataActions';


const PostHowl = props => {

   const postHowl = () => {
        props.postHowl(props.fuser,({ howlBody: props.howlBody }));
        props.clearFunction();
        
        
    }

    const consoleLogger = () => {
        console.log("Can't post a silent howl");
    }


        let buttonMarkup = props.data.fuser.fuser ? (
            <OwlFuseButton tip="POST HOWL" onClick={postHowl}>
                <HowlPostIcon className="icon16 foam orange"/>
            </OwlFuseButton>
        ) : (<OwlFuseButton tip="OPEN A HOWL TO USE THIS BUTTON" onClick={consoleLogger}>
            <HowlPostIcon className="icon16" />
            </OwlFuseButton>)
        return(
            <div>
                {buttonMarkup}
            </div>
        )
}

PostHowl.propTypes = {
    howlBody: PropTypes.string.isRequired,
    howler: PropTypes.string,
    postHowl: PropTypes.func.isRequired,
    fuser: PropTypes.string,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    fetchFuserHowls: PropTypes.func.isRequired,
    howls: PropTypes.array,
    clearFunction: PropTypes.func,
    increaseHowlCount: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user,
    fuser: state.data.fuser.fuser,
    clozang: state.user.credentials.clozang
});

export default connect(mapStateToProps, { postHowl, increaseHowlCount, fetchFuserHowls })(PostHowl);