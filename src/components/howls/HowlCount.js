import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHowlCount, fetchSingleHowl } from '../../redux/actions/dataActions';

const styles = {

}

class HowlCount extends Component{
    state = {
        howlCount: 0
    }

    componentDidMount(){
        this.props.getHowlCount(this.props.docKey)
        this.setState({ howlCount: this.props.data.count.howlCount });
    }

    componentDidUpdate(){
        this.props.fetchSingleHowl(this.props.docKey);
        this.setState({ howlCount: this.props.data.count.howlCount });
    }

    render(){

        const { classes, docKey } = this.props;
        const { count: { howlCount }} = this.props.data;
        
        let countMarkup = howlCount > 0 ? (
            <Fragment>
                <strong>{howlCount} Howls</strong>
            </Fragment>
        ) : ( <Fragment>
            <strong>No Howls Yet</strong>
        </Fragment>)      
        return(
            {countMarkup}
        )
    }
}

HowlCount.propTypes = {
    classes: PropTypes.object.isRequired,
    docKey: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data
});

mapActionsToProps = {
    fetchSingleHowls,

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HowlCount));