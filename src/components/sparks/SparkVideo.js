import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import AddVideoIcon from '../icons/AddVideoIcon';
import { addSparkVideo } from '../../redux/actions/dataActions';

const styles = {

}


class SparkVideo extends Component{

    handleVideoAdd = event => {
        const video = event.target.files[0];
        const formData = new FormData();
        formData.append("video", video, video.name);
        this.props.addSparkVideo(formData);
      };
      handleAddVideo = () => {
        const fileInput = document.getElementById("sparkVideoInput");
        fileInput.click();
      };

    render(){

        const { classes } = this.props;

        return(
           <Fragment>
               <input
                type="file"
                id="sparkVideoInput"
                hidden="hidden"
                onChange={this.handleVideoAdd}
              />
               <OwlFuseButton
               tip="ADD A VIDEO"
               onClick={this.handleAddVideo}>
                   <AddVideoIcon className="oaky orange icon16"/>
               </OwlFuseButton>
           </Fragment>
        )
    }
}

SparkVideo.propTypes = {
    addSparkVideo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data,
    auth: state.firebase.auth
});

const mapActionsToProps = {
    addSparkVideo
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SparkVideo));