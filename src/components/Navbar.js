import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import OwlFuseButton from "../util/OwlFuseButton";
import OwlFuseTitle from "../images/owlfuse-title.png";

// Components
import PostSpark from "./sparks/PostSpark";
import Sizzles from "./Sizzles";
import Toggle from "./Toggle";

// MUI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "./icons/HomeIcon";
import OkelistIcon from "./icons/OkelistIcon";
import BoozulaIcon from "./icons/BoozulaIcon";
import HowlIcon from "./icons/HowlIcon";
import HeatIcon from "./icons/HeatIcon";
import LoginIcon from './icons/LoginIcon';
import SignUpIcon from './icons/SignUpIcon';
import ResetPWIcon from './icons/ResetPWIcon';

const styles = {
	toggleIsActive: {
		color: "#ff9800 !important",
	},
	toggleIsInactive: {
		color: "#f4db9d !important",
	},
};

export class Navbar extends Component {
	state = {
		toggleChecked: false,
	};

	handleToggle = (event) => {
		if (event.target.checked) {
			this.setState({ toggleChecked: true });
		} else {
			this.setState({ toggleChecked: false });
		}
	};

	render() {
		const { authenticated, classes } = this.props;
		return (
			<AppBar>
				<Fragment>
					<hr className="bar-separator" />
					{authenticated ? (
						<Fragment>
							<div className="centered">
								<span
									className={`toggle-text ${
										!this.state.toggleChecked
											? classes.toggleIsActive
											: classes.toggleIsInactive
									}`}
								>
									Owl
								</span>
								<Toggle toggleFunx={this.handleToggle} />
								<span
									className={`toggle-text ${
										this.state.toggleChecked
											? classes.toggleIsActive
											: classes.toggleIsInactive
									}`}
								>
									Fuse
								</span>
							</div>
						</Fragment>
					) : null}
				</Fragment>
				<Toolbar className="nav-container">
					{authenticated ? (
						!this.state.toggleChecked ? (
							<Fragment>
								<PostSpark />
								<Link to="/howls">
									<OwlFuseButton tip="HOWLS">
										<HowlIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/">
									<OwlFuseButton tip="HOME">
										<HomeIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/sparks">
									<OwlFuseButton tip="SPARKS">
										<HeatIcon />
									</OwlFuseButton>
								</Link>
								<Sizzles clozang={this.props.clozang}/>
							</Fragment>
						) : (
							<Fragment>
								<PostSpark />
								<Link to="/boozulas">
									<OwlFuseButton tip="BOOZULAS">
										<BoozulaIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/">
									<OwlFuseButton tip="GO HOME">
										<HomeIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/okelists">
									<OwlFuseButton tip="OKELISTS">
										<OkelistIcon />
									</OwlFuseButton>
								</Link>
								<Sizzles clozang={this.props.clozang}/>
							</Fragment>
						)
					) : (
						<Fragment>
							<Link to="/login">
									<OwlFuseButton tip="LOGIN">
										<LoginIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/signup">
									<OwlFuseButton tip="SIGN UP">
										<SignUpIcon />
									</OwlFuseButton>
								</Link>
								<Link to="/reset">
									<OwlFuseButton tip="RESET PASSWORD">
										<ResetPWIcon />
									</OwlFuseButton>
								</Link>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	clozang: state.user.credentials.clozang
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
