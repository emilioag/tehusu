import React from 'react';
import moment from 'moment';
import { button, clickedButton } from './monthlystyle.jsx';


const Monthly = React.createClass({
  getInitialState() {
    let currentMonth = moment().month();
    return {
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      clicked: currentMonth,
      dateStart: moment().month(currentMonth).startOf('month').unix(),
      dateEnd: moment().month(currentMonth).endOf('month').unix(),
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
    let months = this.state.months.map(i=>{
        let currentStyle = button,
            monthName = moment().month(i).format('MMMM');
        if ( i == this.state.clicked ) currentStyle = clickedButton;
        return <div id={i} key={i} className="row" style={currentStyle} onClick={this.handleClick}>{monthName}</div>;
      })
    return (
      <div className="col-md-12">
        { months }
      </div>
    )
  }
});

export default Monthly;