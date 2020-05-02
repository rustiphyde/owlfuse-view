import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchUserHowls, postHowl, fetchFuserHowls, fetchSingleHowl } from "../redux/actions/dataActions";
import OwlFuseButton from "../util/OwlFuseButton";
import Howler from '../components/howls/Howler';
import Howl from '../components/howls/Howl';
import HowlList from '../components/howls/HowlList';
import PostHowl from '../components/howls/PostHowl';
// MUI Stuff
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
//Icons
import HowlIcon from "../components/icons/HowlIcon";
import MenuIcon from "../components/icons/MenuIcon";
import RejectRequestIcon from "../components/icons/RejectRequestIcon";
import HowlPostIcon from "../components/icons/HowlPostIcon";
const styles = {
	main: {
		marginTop: "-26px"
	},
	title: {
		display: "inline-block",
		color: "#ff9800",
		paddingLeft: "16px",
	},
	titleBar: {
		backgroundColor: "#263238",
		borderRadius: "16px 0 0 0",
		borderBottom: "3px solid #ff9800",
    },
    ava: {
      backgroundColor: "#ff9800",
      color: "#263238"  
    },
	fusers: {
		color: "#f4db9d",
    },
    scroll: {
        overflowY: 'scroll',
        height: '20rem',
        width: '100%',
        overflowX: 'hidden'

    },
	listBack: {
		backgroundColor: "#263238",
        borderLeft: "3px solid #ff9800",
	},
	listItem: {
		borderBottom: "1px solid #ff9800",
	},
	progress: {
		position: "absolute",
	},
	field: {
		backgroundColor: "white",
		borderRadius: "0 0 16px 0",
		padding: "8px 32px",
		marginBottom: "8px",
		marginTop: "8px",
		marginLeft: "8px",
	},
	rightBorder: {
		borderRight: "3px solid #ff9800",
		borderLeft: "3px solid #ff9800",
		marginBottom: "-5px",
	},
	rightBottom: {
		border: "3px solid #ff9800",
		backgroundColor: "#263238",
		borderRadius: "0 0 16px 0",
		display: "flex",
	},
	howlButton: {
		marginLeft: "1rem",
		marginTop: ".5rem"
	},
	cancelButton: {
		display: "inline-block",
		marginLeft: ".5rem",
		fontSize: "2.5rem",
		marginTop: ".5rem",
		color: "#f4db9d",
		"&:hover": {
			color: "#ff9800",
		},
	},
	hidden: {
		display: "none !important",
		
	},
	buttons: {
		display: "flex",
		marginTop: "-1rem",
	},
};

class howls extends Component {
	state = {
		howls: null,
		menu: false,
        howlBody: "",
		docKey: null
	};

	toggleMenu = () => {
		if (this.state.menu === true) {
			this.setState({ menu: false });
		} else {
			this.setState({ menu: true });
		}
	};

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

	  handleClear = () => {
		  this.setState({ howlBody: ''});
	  }

	render() {
		const { classes } = this.props;
		const { howls, loading } = this.props.data;
		const {
			credentials: { clozang, imageUrl }
		} = this.props.user;

		return (
			<Grid container spacing={1} className={classes.main}>
				<Grid item sm={12} xs={12} className={classes.titleBar}>
					<Fragment>
						<hr className="bar-separator" />
						<OwlFuseButton
                            className="howlIcon"
                            onClick={this.toggleMenu}
							tip={!this.state.menu ? "OPEN MENU" : "COLLAPSE MENU"}
						>
							<MenuIcon
								className="icon2 foam orange"
							/>
						</OwlFuseButton>
						<Typography variant="h4" className={classes.title}>
							<strong>HOWLBOX</strong>
						</Typography>
						<hr className="bar-separator" />
					</Fragment>{" "}
				</Grid>
				<Grid
					item
					md={3}
					sm={12}
					xs={12}
					className={!this.state.menu ? classes.hidden : classes.listBack}
				>
					<HowlList/>
				</Grid>
				<Grid
					item
					md={!this.state.menu ? 12 : 9}
					sm={12}
					xs={12}
					className={classes.rightBorder}
				>
                    <Howl/>
                </Grid>
				<Grid
					item
					md={3}
					className={!this.state.menu ? classes.hidden : "list-bottom"}
				/>
				<Grid
					item
                    md={!this.state.menu ? 12 : 9}
                    sm={12}
                    xs={12}
					className={classes.rightBottom}
				>
					<Grid container>
						<Grid item md={10} sm={10} xs={10} className={classes.textBack}>
                                <TextField fullWidth 
                                value={this.state.howlBody}
                                onChange={this.handleChange}
                                id="howlBody"
                                name="howlBody"
                                type="text"
                                placeholder="POST A HOWL"
                                multiline
                                className={classes.field} />
						</Grid>
						<Grid item sm={1} xs={1} className={classes.buttons}>
								<PostHowl className={classes.howlButton} howlBody={this.state.howlBody} clearFunction={this.handleClear}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

howls.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	fetchUserHowls: PropTypes.func.isRequired,
	postHowl: PropTypes.func.isRequired,
	fetchFuserHowls: PropTypes.func.isRequired,
	fetchSingleHowl: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	data: state.data,
});

const mapActionsToProps = {
	fetchUserHowls,
	postHowl,
	fetchFuserHowls,
	fetchSingleHowl
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(howls));
