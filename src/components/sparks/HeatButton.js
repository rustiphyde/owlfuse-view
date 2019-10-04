import React, { Component } from "react";
import OwlFuseButton from "../../util/OwlFuseButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import HeatIcon from "../icons/HeatIcon";
// Redux
import { connect } from "react-redux";
import { addHeat, removeHeat } from "../../redux/actions/dataActions";

export class HeatButton extends Component {
  hotSpark = () => {
    if (
      this.props.user.heat &&
      this.props.user.heat.find(
        heat => {
          return heat.sparkId === this.props.sparkId;
        })
    )
      return true;
    else return false;
  };
  addHeat = () => {
    this.props.addHeat(this.props.sparkId);
  };
  removeHeat = () => {
    this.props.removeHeat(this.props.sparkId);
  };
  render() {
    const { authenticated } = this.props.user;
    const heatButton = !authenticated ? (
      <Link to="/login">
        <OwlFuseButton tip="ADD HEAT">
          <HeatIcon color="primary" />
        </OwlFuseButton>
      </Link>
    ) : this.heatedSpark() ? (
      <OwlFuseButton tip="REMOVE HEAT" onClick={this.removeHeat}>
        <HeatIcon color="secondary" />
      </OwlFuseButton>
    ) : (
      <OwlFuseButton tip="ADD HEAT" onClick={this.addHeat}>
        <HeatIcon color="primary" />
      </OwlFuseButton>
    );
    return heatButton;
  }
}

HeatButton.propTypes = {
  sparkId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  addHeat: PropTypes.func.isRequired,
  removeHeat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  addHeat,
  removeHeat
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HeatButton);
