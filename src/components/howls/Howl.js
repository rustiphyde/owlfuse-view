import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

const styles = {
	userSent: {
		backgroundColor: "#263238",
		padding: "16px",
		color: "#f4db9d",
		width: "75%",
		float: "right",
		margin: "8px",
		wordWrap: "break-word",
		fontWeight: 700,
		borderRadius: "16px 0 16px 0",
    },
    userSentPic: {
        float: 'right',
        margin: '0 16px',
        border: '1.5px solid #ff9800'
    },
    fuserSentPic: {
        float: 'left',
        margin: '0 16px',
        border: '1.5px solid #f4db9d'
    },
    	fuserSent: {
		backgroundColor: "#ff9800",
		padding: "16px",
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
        howls: []
    };

	componentDidUpdate = () => {
		const container = document.getElementById("howl-container");
		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
    };
    
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
								<Avatar key={index + "83"} src={howl.avatar} className={
									howl.sentBy === clozang ? classes.userSentPic : classes.fuserSentPic
								}>

</Avatar>
                               
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
			<div>Loading...</div>
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
};

const mapStateToProps = (state) => ({
	data: state.data,
	user: state.user,
	howls: state.data.howls,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Howl));
