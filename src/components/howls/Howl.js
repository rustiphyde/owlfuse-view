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
		color: "#ff9800",
		width: "50%",
		float: "right",
		margin: "8px",
		wordWrap: "break-word",
		fontWeight: 700,
		borderRadius: "16px 0 16px 0",
    },
    userSentPic: {
        float: 'right',
        margin: '0 16px'
    },
    fuserSentPic: {
        float: 'left',
        margin: '0 16px'
    },
    	fuserSent: {
		backgroundColor: "#ff9800",
		padding: "16px",
		color: "#263238",
		width: "50%",
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
		howlings: [],
		docKey: null,
	};

	componentDidUpdate = () => {
		const container = document.getElementById("howl-container");
		if (container) {
			container.scrollTo(0, container.scrollHeight);
		}
	};

	render() {
		const { classes, howlings } = this.props;
		const { loading } = this.props.data;
		const {
			credentials: { clozang },
		} = this.props.user;
		let howlingsMarkup = !loading ? (
			howlings && howlings.length > 0 ? (
				howlings.map((howl) => {
					let index = howlings.indexOf(howl);
					return (
						<Fragment key={index}>
							
							<div
								key={index}
								className={
									howl.sentBy === clozang ? classes.userSent : classes.fuserSent
								}
							>
                                <Avatar
								src={howl.avatar.toString()}
								key={index}
								className={
									howl.sentBy === clozang
										? classes.userSentPic
										: classes.fuserSentPic
								}
							></Avatar>
								{howl.howlBody}
							</div>
						</Fragment>
					);
				})
			) : (
				<strong className="candle centered">
					You do not currently have any active howls to view
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
	howlings: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
	user: state.user,
	howlings: state.data.howlings,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Howl));
