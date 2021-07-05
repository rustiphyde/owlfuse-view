import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AppIcon from "../images/owlfuse-logo-big.png";
// Icons
import AddSparkIcon from "../components/icons/AddSparkIcon";
import AddTextIcon from "../components/icons/AddTextIcon";
import AddImageIcon from "../components/icons/AddImageIcon";
import AddVideoIcon from "../components/icons/AddVideoIcon";
import AddAudioIcon from "../components/icons/AddAudioIcon";
import CloseIcon from "../components/icons/CloseIcon";
// Util
import SparkSkeleton from "../util/SparkSkeleton";

const styles = {
	subtitle: {
		fontFamily: "Baloo",
		fontSize: "1.5rem",
		color: "#263238",
	},
	para: {
		fontFamily: "Palanquin Dark",
		fontSize: "1.25rem",
		color: "#263238",
		textAlign: "left !important",
		fontWeight: "500 !important",
        lineHeight: "2rem"
	},
	brand: {
		fontFamily: "Baloo",
		fontWeight: "900 !important",
	},
	icons: {
		fontSize: "1.75rem",
		"&:hover": {
			color: "#ff9800 !important",
		},
	},
};

class about extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.textBox}>
				<Grid item xs />
				<Grid item xs={8}>
					<div className="sparkTitle">
						<strong>WHAT IS OWLFUSE?</strong>
						<hr className="bar-separator" />
						<img
							src={AppIcon}
							alt="OwlFuse Logo"
							className={classes.image}
							width="120"
						/>
						<br />
						<strong className={classes.subtitle}>I'm glad you asked...</strong>
						<hr className="bar-separator" />
						<span className={classes.para}>
							<p>
								<span className={classes.brand}>......OwlFuse</span>, to put it
								simply, is a social media platform for night owls. A place where
								users (or <i>fusers</i>) can connect with like-minded
								individuals, share their experiences and plan for a night out.
								However, it does have some unique twists that you won't find on
								any other social media site you might be familiar with.
								Therefore, it might require some explanation to fully understand
								how things work around here. So let's get to it!! :)
							</p>
						</span>
						<hr className="bar-separator" />
						<strong className={classes.subtitle}>ORIGIN STORY</strong>
						<hr className="bar-separator" />
						<span className={classes.para}>
							<p>
								Before we get into the basics of how things work on{" "}
								<span className={classes.brand}>OwlFuse</span>, I feel it's
								important to tell the story of how{" "}
								<span className={classes.brand}>OwlFuse</span> came to be. And
								so, without further ado...(that's correct, there will be no more
								ado allowed from this point forward, sorry for the
								inconvenience)...let us begin...
								<br />								
							</p>
                            <p>

                            </p>
						</span>
						<hr className="bar-separator" />
						<strong className={classes.subtitle}>SPARKS</strong>
						<hr className="bar-separator" />
						<SparkSkeleton length={1} />
						<span className={classes.para}>
							<p>
								Sparks are the main type of <i>post</i> on{" "}
								<span className={classes.brand}>OwlFuse</span>. They come in
								many flavors but they all have the same basic purpose; to spark
								an interest. To create a new spark a fuser needs to click on the
								"Add Spark" icon that looks like this{" "}
								<AddSparkIcon className={classes.icons} />, located in either
								the top navigation bar or in the header of the Sparks Page.
								Clicking on this icon will open a dialog box that asks{" "}
								<span className={classes.brand}>"WHAT KIND OF SPARK?"</span> and
								presents the fuser with the following icons...
								<AddTextIcon className={classes.icons} />,{" "}
								<AddImageIcon className={classes.icons} />,{" "}
								<AddVideoIcon className={classes.icons} />, and{" "}
								<AddAudioIcon className={classes.icons} />. These icons
								represent posting an all text spark, an image spark, a video
								spark and an audio spark, respectively. Clicking on the{" "}
								<AddTextIcon className={classes.icons} /> icon will open another
								dialog box that says{" "}
								<span className={classes.brand}>"POST A NEW SPARK"</span>, with
								a textfield labeled "SPARK AN INTEREST". The fuser simply types
								what they want to say and presses "DONE" to post the new text
								spark. Or, they can press the{" "}
								<CloseIcon className={classes.icons} /> at the top right of the
								dialog box to cancel their spark. Clicking instead on either the{" "}
								<AddImageIcon className={classes.icons} /> icon, the{" "}
								<AddVideoIcon className={classes.icons} /> icon, or the{" "}
								<AddAudioIcon className={classes.icons} /> icon will also open a
								dialog box with the same textfield but will also have an area
								available to upload or paste in content. The functionality,
								however, is exactly the same when it comes to posting the spark.
								New spark types will be added as the site progresses.
								<br />
								Once the spark has been posted it can be seen in all of the
								fuser's Spark areas. These areas exist on their home page, their
								profile page and on the main Sparks page, where Sparks from all
								fusers can be viewed.
								<br />
								<br />
								Sparks have the same basic structure. The top of the Spark shows
								the fuser's avatar photo, their fuser name (known as a "clozang"
								but more on that later), and how long ago the Spark was created.
								The next section contains any text in the body of the Spark as
								well as the content that was added to the Spark; such as a GIF
								image file or an audio clip.
							</p>
						</span>
					</div>
				</Grid>
				<Grid item xs />
			</Grid>
		);
	}
}

export default withStyles(styles)(about);
