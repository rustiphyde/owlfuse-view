import React, { Component } from "react";
import OwlFuseButton from "../../util/OwlFuseButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import CheersIcon from "../icons/CheersIcon";
// Redux
import { connect } from "react-redux";
import { addCheers, removeCheers } from "../../redux/actions/dataActions";

class CheersButton extends Component {
  hasCheers = () => {
    if (
      this.props.user.cheers &&
      this.props.user.cheers.find(
        cheer => {
          return cheer.boozId === this.props.boozId;
        })
    )
      return true;
    else return false;
  };
  addCheers = () => {
    this.props.addCheers(this.props.boozId);
  };
  removeCheers = () => {
    this.props.removeCheers(this.props.boozId);
  };
  render() {
    const { authenticated } = this.props.user;
    const cheersButton = !authenticated ? (
      <Link to="/login">
        <OwlFuseButton tip="ADD CHEERS">
          <CheersIcon className="icon2 foam"/>
        </OwlFuseButton>
      </Link>
    ) : this.hasCheers() ? (
      <OwlFuseButton tip="REMOVE CHEERS" onClick={this.removeCheers}>
        <CheersIcon className="icon2 rusty"/>
      </OwlFuseButton>
    ) : (
      <OwlFuseButton tip="ADD CHEERS" onClick={this.addCheers}>
        <CheersIcon className="icon2 foam"/>
      </OwlFuseButton>
    );
    return cheersButton;
  }
}

CheersButton.propTypes = {
  boozId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  addCheers: PropTypes.func.isRequired,
  removeCheers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  addCheers,
  removeCheers
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CheersButton);
