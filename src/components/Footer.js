import React, { Component, Fragment } from 'react';
import OwlClock from './OwlClock';
import OwlFuseButton from '../util/OwlFuseButton';
import LogoutIcon from './icons/LogoutIcon';
import { logoutUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Footer extends Component {

  handleLogout = () => {
    this.props.logoutUser();
    window.location.href = "/login";
  };


  render() {

    const { user: {
      authenticated
    }} = this.props

      return (
        <Fragment>
          <hr className="bar-separator-footer"/>
           <div className="footer">
           <span><OwlClock/></span>
          
          <hr className="bar-separator-footer"/>
          { authenticated ? (
             <div className="candle centered">
             <OwlFuseButton
             tip="LOGOUT"
             onClick={this.handleLogout} className="logout">
           <LogoutIcon className="icon foam orange"/>
           </OwlFuseButton>
           </div>
           ) : null}
          <hr className="bar-separator-footer"/>
          <p className="footer-text">© {new Date().getFullYear()} Rusty Hoppins, All Rights Reserved.</p>
            
        </div>
        
        </Fragment>
         
        
      )
  }
}

Footer.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect( mapStateToProps, { logoutUser })(Footer);