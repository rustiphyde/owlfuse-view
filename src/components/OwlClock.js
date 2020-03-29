import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {

};

class OwlClock extends Component {
      
      state = {
          time: "00:00:00",
          amPm: "AM"
      }

      componentDidMount() {
        const 
        takeTwelve = n => n > 12 ?  n  - 12 : n,
           addZero = n => n < 10 ? "0" +  n : n;

                      
          setInterval(() => {
            let d, h, m, s, t, amPm;
          
          d = new Date();
          h = addZero(takeTwelve(d.getHours())); 
          m = addZero(d.getMinutes()); 
          s = addZero(d.getSeconds());
              t = `${h}:${m}:${s}`;
          
          amPm = d.getHours() >= 12 ? "PM" : "AM";
    
          this.setState({
            time: t, 
            amPm: amPm
          });
          
        }, 1000);
        }
      
        render () {

        const { classes } = this.props;
          return (
              <Fragment>
                  <div className="most-inner">
                <span className={
                  this.state.time === "00:00:00" 
                    ? "time blink" 
                    : "time"} 
                > {this.state.time}
                </span>
                <span className="amPm">
                  {this.state.amPm}
                </span>
              </div>
              </Fragment>
              
        );
      }
    };
    

OwlClock.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OwlClock);
