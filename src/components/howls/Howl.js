import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OwlFuseButton from '../../util/OwlFuseButton';
import { connect } from 'react-redux';


const styles = {

}

class Howl extends Component {
    
    state = {
        howlings: []
    }

    componentDidUpdate = () => {
        const container = document.getElementById('howl-container');
        if(container){
            container.scrollTo(0, container.scrollHeight);
        }
    }



    render(){


        const { classes, howlings } = this.props;
        const { loading } = this.props.data;

        let howlingsMarkup = !loading ? (
            howlings && howlings !== null && howlings.length > 0 ? (<div>Howls Exist</div>) : (<div>Howls Do Not Exist</div>)
        ) : (
            <div>Loading...</div>
        )

        return(
            <Fragment>
                {howlingsMarkup}
            </Fragment>
        )
    }
}

Howl.propTypes = {
    classes: PropTypes.object.isRequired,
    howlings: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    howlings: state.data.howlings
})

export default connect(mapStateToProps, null)(withStyles(styles)(Howl));