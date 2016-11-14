import React from 'react';
import moment from 'moment';
import { button, clickedButton } from './monthlystyle.jsx';

const Tooltip = React.createClass({
  model: {
    daily: {
      granularity: [ "Minute","Hour" ],
      default: "Minute"
    },
    weekly: {
      granularity: [ "Hour","Day" ],
      default: "Hour"
    },
    monthly: {
      granularity: [ "Day" ],
      default: "Day"
    },
    yearly: {
      granularity: [ "Month" ],
      default: "Month"
    }
  },
  getInitialState() {
    return {
      granularities: [],
      clicked: ""
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      granularities: this.model[nextProps.interval]["granularity"],
      clicked: nextProps.clicked.replace(/\b\w/g, l => l.toUpperCase())
    });
  },
  handleClick ( e ) {
    this.setState({
      clicked: e.target.id
    });
    this.props.onClick(e.target.id.toLowerCase());
  },
  render () {
    let size = "col-md-" + (12 / this.state.granularities.length);
    let toolTipElems = this.state.granularities.map(granularity=>{
      let currentStyle = button;
      if ( granularity == this.state.clicked ) currentStyle = clickedButton;
      return <div id={granularity} key={granularity} className={size} style={ currentStyle } onClick={this.handleClick}>{granularity}</div>;
    });
    return (
      <div className="col-md-12">
        <div className="row">
          { toolTipElems }
        </div>
      </div>
    )
  }
});

export default Tooltip;