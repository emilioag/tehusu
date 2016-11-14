import React from 'react';
import moment from 'moment';
import { button, clickedButton } from './monthlystyle.jsx';


const Yearly = React.createClass({
  getInitialState() {
    let currentYear = moment().year();
    return {
      years: [2016],
      clicked: currentYear,
      dateStart: moment().year(currentYear).startOf('year').unix(),
      dateEnd: moment().year(currentYear).endOf('year').unix(),
    }
  },
  componentWillMount( ) {
    this.props.onClick(this.state.dateStart, this.state.dateEnd);
  },
  handleClick ( e ) {
    let selectedMonth = parseInt(e.target.id),
        dateStart = moment().month(selectedMonth).startOf('month').unix(),
        dateEnd = moment().month(selectedMonth).endOf('month').unix();
    this.setState({
      clicked: selectedMonth,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
    this.props.onClick(dateStart, dateEnd);
  },
  render () {
    let years = this.state.years.map(i=>{
        let currentStyle = button;
        if ( i == this.state.clicked ) currentStyle = clickedButton;
        return <div id={i} key={i} className="row" style={currentStyle} onClick={this.handleClick}>{ i }</div>;
      })
    return (
      <div className="col-md-12">
        { years }
      </div>
    )
  }
});

export default Yearly;