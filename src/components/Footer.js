import React, { Component, Fragment } from 'react';
import OwlClock from './OwlClock';

export class Footer extends Component {
  render() {
      return (
        <Fragment>
           <div className="footer">
         
          <hr className="bar-separator"/>
          <p className="footer-text">© {new Date().getFullYear()} Rusty Hoppins, All Rights Reserved.</p>
          <span><OwlClock/></span>
          <hr className="bar-separator"/>  
        </div>
        
        </Fragment>
         
        
      )
  }
}

export default Footer;