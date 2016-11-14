import React from 'react';
import DayPicker, { DateUtils } from "react-day-picker";
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const Daily = React.createClass({
  clicked: false,
  getInitialState() {
    return {
        selectedDay: moment().toDate(),
    }
  },
  componentWillMount( ) {
    let startDate = moment(this.state.selectedDay).startOf('day').unix();
    let endDate = moment(this.state.selectedDay).endOf('day').unix();
    this.props.handleDayClick(startDate, endDate);
  },
  handleDayClick(e, day) {
    this.clicked = true;
    this.setState( { selectedDay: day } );
    let startDate = moment(day).startOf('day').unix();
    let endDate = moment(day).endOf('day').unix();
    this.props.handleDayClick(startDate, endDate);
  },
  render () {
    return (<DayPicker
      initialMonth={ moment().startOf('month').toDate() }
      selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
      onDayClick={ this.handleDayClick }
    />)
  }
});

export default Daily;