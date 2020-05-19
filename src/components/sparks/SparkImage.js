import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OwlFuseButton from '../../util/OwlFuseButton';
import { withStyles } from '@material-ui/core/styles';
import AddImageIcon from '../icons/AddImageIcon';
import { addSparkImage } from '../../redux/actions/dataActions';

const styles = {

}


class SparkImage extends Component{

    handleImageAdd = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.addSparkImage(formData);
      };
      handleAddImage = () => {
        const fileInput = document.getElementById("sparkImageInput");
        fileInput.click();
      };

    render(){

        const { classes } = this.props;

        return(
           <Fragment>
               <input
                type="file"
                id="sparkImageInput"
                hidden="hidden"
                onChange={this.handleImageAdd}
              />
               <OwlFuseButton
               tip="IMAGE SPARK"
               onClick={this.handleAddImage}>
                   <AddImageIcon className="oaky orange icon5"/>
               </OwlFuseButton>
           </Fragment>
        )
    }
}

SparkImage.propTypes = {
    addSparkImage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data,
    auth: state.firebase.auth
});

const mapActionsToProps = {
    addSparkImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SparkImage));