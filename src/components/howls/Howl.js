import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import { connect } from "react-redux";
import { Avatar, CircularProgress } from "@material-ui/core";
import { fetchFuserHowls, getHowlCount } from '../../redux/actions/dataActions';
import EditHowl from './EditHowl';

const styles = {
	userSent: {
		backgroundColor: "#263238",
		padding: "16px",
		color: "#f4db9d",
		width: "75%",
		float: "right",
		lineHeight: '20px',
		letterSpacing: '1px',
		margin: "8px",
		wordWrap: "break-word",
		fontWeight: 700,
		borderRadius: "16px 0 16px 0",
    },
    fuserSentPic: {
        float: 'left',
        margin: '6px 16px',
        border: '1.5px solid #f4db9d'
    },
    	fuserSent: {
		backgroundColor: "#ff9800",
		padding: "16px",
		letterSpacing: '1px',
		lineHeight: '20px',
		color: "#263238",
		width: "75%",
		float: "left",
		margin: "8px",
		fontWeight: 700,
		borderRadius: "0 16px 0 16px",
	},
	content: {
		height: "320px",
		overflow: "auto",
		boxSizing: "border-box",
		overflowY: "scroll",
		width: "100%",
	},
};

class Howl extends Component {
	state = {
		howls: null,
		howlCount: 0
	};
	componentDidMount = () => {
		const container = document.getElementById("howl-container");
		this.setState({ howls: this.props.data.howls})
		setTimeout(() => this.scrollFxn(container), 500);
		setTimeout(() => this.scrollFxn(container), 1000);
		setTimeout(() => this.scrollFxn(container), 2000);
		setTimeout(() => this.scrollFxn(container), 3000);
		setTimeout(() => this.scrollFxn(container), 4000);
		setTimeout(() => this.scrollFxn(container), 5000);
		setTimeout(() => this.scrollFxn(container), 10000);
		setInterval(() => this.updaterFxn(this.state.howlCount, this.props.data.count.howlCount), 2000);
	};
	
	updaterFxn = (numberOne, numberTwo) => {
		const container = document.getElementById("howl-container");
		this.props.getHowlCount([this.props.data.fuser.fuser, this.props.user.credentials.clozang].sort().join("::"));
			this.setState({ howlCount: this.props.data.count.howlCount });
		if(numberOne < numberTwo){
			this.props.fetchFuserHowls(this.props.data.fuser.fuser);
			this.setState({ howls: this.props.data.howls});
			setTimeout(() => this.scrollFxn(container), 500);
			setTimeout(() => this.scrollFxn(container), 1000);
			setTimeout(() => this.scrollFxn(container), 2000);
			setTimeout(() => this.scrollFxn(container), 3000);
			setTimeout(() => this.scrollFxn(container), 4000);
			setTimeout(() => this.scrollFxn(container), 5000);
			setTimeout(() => this.scrollFxn(container), 10000);
		}

	}

	scrollFxn = (container) => {
		
		container.scrollTo(0, container.scrollHeight);
	}
    
	render() {


		const { classes, howls } = this.props;
		const { loading } = this.props.data;
		const {
			credentials: { clozang, imageUrl },
		} = this.props.user;
		let howlingsMarkup = !loading ? (
			howls && howls.length > 0 ? (
				howls.map((howl) => {
					let index = howls.indexOf(howl);
					return (
						<Fragment key={index + "54"}>
							
							<div
								key={index}
								className={
									howl.sentBy === clozang ? classes.userSent : classes.fuserSent
								}
							>
								
                               {
								   howl.sentBy === clozang ? (<EditHowl howl={howl} className={classes.userSentPic} />) : <Avatar key={index + "83"} src={howl.avatar} className={
									classes.fuserSentPic
								}>

</Avatar>
							   }
								{howl.howlBody}
							</div>
						</Fragment>
					);
				})
			) : (
				<strong className="candle centered">
					You do not have any howls to view at this time
				</strong>
			)
		) : (
			<CircularProgress
            color="secondary"
            size={80}
            className="candle centered"
        />
		);

		return (
			<Fragment>
				<div id="howl-container" className={classes.content}>
					{howlingsMarkup}
				</div>
			</Fragment>
		);
	}
}

Howl.propTypes = {
	classes: PropTypes.object.isRequired,
	howls: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	fuser: PropTypes.string,
	fetchFuserHowls: PropTypes.func.isRequired,
	getHowlCount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.data,
	user: state.user,
	howls: state.data.howls,
	howlCount: state.data.count.howlCount
});

export default connect(mapStateToProps, { fetchFuserHowls, getHowlCount })(withStyles(styles)(Howl));
