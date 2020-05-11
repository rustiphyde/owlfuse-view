import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getSparks, getInfernals } from '../redux/actions/dataActions';

// Components
import Spark from '../components/sparks/Spark';
import PostSpark from '../components/sparks/PostSpark';
import SparkSkeleton from "../util/SparkSkeleton";
import Toggle from "../components/Toggle";

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const styles = {
	toggleIsActive: {
		color: "#ff9800 !important"
	},
	toggleIsInactive: {
		color: "#263238 !important"
	}
};

class sparks extends Component {

    state = {
        toggleChecked: false,
        sparks: null
    }

    componentDidMount(){
        this.props.getSparks();
        this.props.getInfernals();
    }

	handleToggle = event => {
		if (event.target.checked) {
			this.setState({ toggleChecked: true });
			console.log("toggle is checked");
		} else {
			this.setState({ toggleChecked: false });
			console.log("toggle is not checked");
		}
	};

    render(){


        const { classes } = this.props;

        const { sparks, infernals, loading } = this.props.data;

        let sparksMarkup = loading ? (
            <SparkSkeleton/>
        ) : ( !this.state.toggleChecked ? (
         sparks.map(spark => <Spark key={spark.sparkId} spark={spark}/>)
        ) : ( infernals.map(infernal => <Spark key={infernal.sparkId} spark={infernal}/>))

        )

        return(<Grid container spacing={1}>
            <Grid item sm={1}/>
            <Grid item sm={10} xs={12}>
            <div className="boozTitle1">
            <strong>SPARKS</strong>
            <hr className="bar-separator" />
            <PostSpark/>
            <hr className="bar-separator"/>
          </div><div className="centered">
						<span
							className={`toggle-text ${
								!this.state.toggleChecked
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Most Recent
						</span>
						<Toggle toggleFunx={this.handleToggle} />
						<span
							className={`toggle-text ${
								this.state.toggleChecked
									? classes.toggleIsActive
									: classes.toggleIsInactive
							}`}
						>
							Scorch Rank
						</span>
					</div>
                    <hr className="bar-separator"/>
					{sparksMarkup}
            </Grid>
            <grid item sm={1}/>

        </Grid>)
    }
}

sparks.propTypes = {
    classes: PropTypes.object.isRequired,
    getSparks: PropTypes.func.isRequired,
    getInfernals: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
});

const mapActionsToProps = {
   getSparks,
   getInfernals 
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(sparks));