import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OwlFuseButton from "../../util/OwlFuseButton";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import { useFirestoreConnect, useFirebaseConnect } from "react-redux-firebase";
import { Avatar, CircularProgress } from "@material-ui/core";
import EditHowl from "./EditHowl";

const styles = {
	userSent: {
		backgroundColor: "#263238",
		padding: "16px",
		color: "#f4db9d",
		width: "75%",
		float: "right",
		lineHeight: "20px",
		letterSpacing: "1px",
		margin: "8px",
		wordWrap: "break-word",
		fontWeight: 700,
		borderRadius: "16px 0 16px 0",
	},
	fuserSentPic: {
		float: "left",
		margin: "6px 16px",
		border: "1.5px solid #f4db9d",
	},
	fuserSent: {
		backgroundColor: "#ff9800",
		padding: "16px",
		letterSpacing: "1px",
		lineHeight: "20px",
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



const Howl = (props) => {
	useFirestoreConnect({ collection: "Howls", orderBy: ["createdAt", "asc"] });
	const howls = useSelector((state) => state.firestore.ordered.Howls);

	useEffect(() => {
		
		setTimeout(() => {

			let cont = document.getElementById("howl-container");
			if (cont) {
				cont.scrollTo(0, cont.scrollHeight);
			}
		}, 3000);
	}, []);

	useEffect(() => {
		let cont = document.getElementById("howl-container");

		if (cont) {
			cont.scrollTo(0, cont.scrollHeight);
		}
	}, [howls]);
	let howlText;
	let howlingsMarkup = !props.loading ? (
		howls && howls.length > 0 ? (
			
			howls.map((howl) => {
				if (howl.docKey === [props.fuser, props.clozang].sort().join("::")) {
					howlText = "";
					let index = howls.indexOf(howl);
					
					return (
						<div key={index + "54"}>
							<div
								key={index}
								className={
									howl.sentBy === props.clozang
										? props.classes.userSent
										: props.classes.fuserSent
								}
							>
								{howl.sentBy === props.clozang ? (
									<EditHowl
										howl={howl}
										howlId={howl.howlId}
										className={props.classes.userSentPic}
									/>
								) : (
									<Avatar
										key={index + "83"}
										src={howl.avatar}
										className={props.classes.fuserSentPic}
									></Avatar>
								)}
								{howl.howlBody}
							</div>
						</div>
					);
				}
				else {
					howlText = "Sorry, but you do not have any howls to view at this time."
				}
			})
		) : (
			<strong className="candle centered">
				You do not have any howls to view at this time
			</strong>
		)
	) : (
		<CircularProgress color="secondary" size={80} className="candle centered" />
	);

	return (
		<div>
			<div id="howl-container" className={props.classes.content}>
				<strong className="candle centered">{howlText}</strong>
				{howlingsMarkup}
			</div>
		</div>
	);
};

Howl.propTypes = {
	classes: PropTypes.object.isRequired,
	howls: PropTypes.array,
	data: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	fuser: PropTypes.string,
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
		user: state.user,
		fuser: state.data.fuser.fuser,
		clozang: state.user.credentials.clozang,
		loading: state.UI.loading,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default compose(connect(mapStateToProps, null))(
	withStyles(styles)(Howl)
);
