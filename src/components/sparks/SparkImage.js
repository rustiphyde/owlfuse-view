import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import AddImageIcon from '../icons/AddImageIcon';
import { postSparkImage } from '../../redux/actions/dataActions';

const styles = {

}


class SparkImage extends Component{

    handleImageAdd = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.postSparkImage(formData);
        setTimeout(() => this.props.closeFunx(), 3000);
      };
      handleAddImage = () => {
        const fileInput = document.getElementById("sparkImageInput");
        fileInput.click();
      };

    render(){

        const { classes, sparkID } = this.props;

        return(
           <Fragment>
               <input
                type="file"
                id="sparkImageInput"
                hidden="hidden"
                onChange={this.handleImageAdd}
              />
               <OwlFuseButton
               tip="ADD AN IMAGE"
               onClick={this.handleAddImage}>
                   <AddImageIcon className="foam orange icon16"/>
               </OwlFuseButton>
           </Fragment>
        )
    }
}

SparkImage.propTypes = {
    sparkID: PropTypes.string,
    postSparkImage: PropTypes.func.isRequired,
    body: PropTypes.string,
    closeFunx: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data,
    auth: state.firebase.auth
});

const mapActionsToProps = {
    postSparkImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SparkImage));