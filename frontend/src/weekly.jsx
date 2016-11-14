import React from 'react';
import DayPicker, { DateUtils } from "react-day-picker";
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const Daily = React.createClass({
  getInitialState() {
    return {
        to: moment().endOf('isoWeek').toDate(),
        from: moment().startOf('isoWeek').toDate()
    }
  },
  componentWillMount( ) {
    let from = moment(this.state.from),
        to = moment(this.state.to),
        startDate = from.startOf('day').unix(),
        endDate = to.endOf('day').unix();
    this.props.handleDayClick(startDate, endDate);
  },
  handleDayClick(e, day) {
    let from = moment(day).startOf('isoWeek'),
        to = moment(day).endOf('isoWeek'),
        startDate = from.startOf('day').unix(),
        endDate = to.endOf('day').unix();
    this.setState( { from: from.toDate(), to: to.toDate() } );
    this.props.handleDayClick(startDate, endDate);
  },
  render () {
    var from = this.state.from;
    var to = this.state.to;
    return (<DayPicker
      initialMonth={ moment().startOf('month').toDate() }
      selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
      onDayClick={ this.handleDayClick }
    />)
  }
});

export default Daily;