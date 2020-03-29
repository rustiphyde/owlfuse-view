import React, { Component, Fragment } from 'react'
import HowlDash from './howls/HowlDash';
import OwlClock from './OwlClock';

export class Footer extends Component {
  render() {
      return (
        <Fragment>
           <div className="footer">
            
           <HowlDash/>
           
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