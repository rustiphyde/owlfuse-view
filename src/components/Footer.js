import React, { Component } from 'react'

export class Footer extends Component {
  render() {
      return (

          <div className="footer">
          <hr className="bar-separator"/>
          <p><strong>© {new Date().getFullYear()} Rusty Hoppins</strong></p>
          <hr className="bar-separator"/>
        </div>
        
      )
  }
}

export default Footer;