import MenuBar from './menubar.jsx'
import React from 'react';
import Login from './login.jsx'
import ECharts from 'react-echarts';
import styles from './controlpanel.scss';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DayPicker, { DateUtils } from "react-day-picker";
import 'react-day-picker/lib/style.css';
import Daily from './daily';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';
import Tooltip from './tooltip';
import { row, button } from './monthlystyle.jsx';
import TabMenu from './tabMenu.jsx';

const ControlPanel = React.createClass({
  model: {
    daily: {
      default: "minute"
    },
    weekly: {
      default: "hour"
    },
    monthly: {
      default: "day"
    },
    yearly: {
      default: "month"
    }
  },
  menuBarModel: [
    {
      label: 'TEMP VS HUM',
      _id: 'temp'
    },
    {
      label: 'HUMIDITY',
      _id: 'hum'
    }
  ],
  getInitialState() {
    return {
        alert: {
          exist: false,
          error: '',
          msg: ''
        },
        page: 'daily',
        selectedDay: moment().toDate(),
        granularity: 'minute',
        startDate: moment().startOf('day').unix(),
        endDate: moment().endOf('day').unix(),
        login: true,
        option: {
          title : {
              text: 'Temperature VS Humidity',
              subtext: ''
          },
          legend: {
              data:['humidity', 'temperature'],
              right: '20%'
          },
          series: [
            { data: [], type: 'line', name: '' },
            { data: [], type: 'line', name: '' }
          ],
          yAxis: {},
          xAxis: { data: [] },
          tooltip: {
            trigger: 'axis'
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 30,
              end: 70,
              xAxisIndex: [0]
            }
          ]
        }
    }
  },
  logout () {
    localStorage.clear();
    this.setState( { login: false } );
  },
  componentDidMount () {
    this.callApi(this.state.startDate, this.state.endDate, this.state.granularity);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  callApi (start, end, granularity) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('token')
    };
    var data = { method: 'GET', headers: headers };
    var url = dth11URL;
    url += '?dateStart=' + start;
    url += '&dateEnd=' + end;
    url += '&granularity=' + granularity;
    this.serverRequest = fetch( url, data ).then(response => {
      if ( response.status == 403 ) this.logout();
      if ( response.status >= 500 ) return response.status;
      return response.json()
    }).then(data => {
      if ( Number.isInteger(data) ) {
        this.setState({
          alert: {
            exist: true,
            error: data,
            msg: ': An error occurred, try to refresh'
          },
          startDate: start,
          endDate: end,
          granularity: granularity
        });
      } else {
        let newOption = Object.create(this.state.option),
            interval;
        newOption.series = data.series;
        newOption.yAxis = data.yAxis;
        newOption.xAxis = data.xAxis;
        if ( granularity === 'minute') interval = 60;
        else if ( granularity === 'hour') interval = 1;
        newOption.xAxis.axisLabel = { interval: interval, rotate: 90 };
        newOption.grid = {
          bottom: 120,
          left: 50,
          right: 50
        };
        // newOption.dataZoom = this.state.option.dataZoom;
        newOption.tooltip = this.state.option.tooltip;
        newOption.title = {
          text: this.state.option.title.text,
          subtext: this.state.page + ' by ' + granularity
        };

        newOption.legend = this.state.option.legend;

        this.setState({
          alert: {
            exist: false,
            error: '',
            msg: ''
          },
          option: newOption,
          startDate: start,
          endDate: end,
          granularity: granularity
        });
      }
    })
    .catch( error => {
      console.log(error);
    });
  },
  handleClick (e) {
    this.callApi(this.state.startDate, this.state.endDate, e.target.id);
  },
  handleDayClick(start, end) {
    this.callApi(start, end, this.state.granularity);
  },
  handleMenuClick ( menuItem ) {
    this.setState({
      page: menuItem,
      granularity: this.model[menuItem].default
    });
  },
  handleGranularity ( granularity ) {
    this.callApi(this.state.startDate, this.state.endDate, granularity);
  },
  handleMenuBarClick ( where ) {
    console.log(where);
  },
  render () {
    let option, page, alert;
    if ( !this.state.login ) return <Login />;
    if  ( this.state.page === 'daily' )  page = <Daily handleDayClick={ this.handleDayClick } />;
    else  if ( this.state.page === 'weekly' )  page = <Weekly handleDayClick={ this.handleDayClick } />;
    else  if ( this.state.page === 'monthly' ) page = <Monthly onClick={ this.handleDayClick } />;
    else  if ( this.state.page === 'yearly' ) page = <Yearly onClick={ this.handleDayClick } />;
    if ( this.state.alert.exist ) {
      alert = <div className="alert alert-danger">
               <strong>{ this.state.alert.error }</strong> { this.state.alert.msg }
               <a href="#"><i className="fa fa-refresh" aria-hidden="true"></i></a>
             </div>;
    }
    return (
      <div>
        <MenuBar logout={ this.logout } onClick={ this.handleMenuBarClick } model={ this.menuBarModel }/>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              { alert }
              <div className="row">
                <div className={styles.echartsdiv}>
                  <ECharts option={ this.state.option } notMerge={ true }/>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="row" style={ row }>
                <TabMenu onClick={ this.handleMenuClick }/>
              </div>
              <div className="row">
                  { page }
              </div>
              <div className="row">
                <Tooltip clicked={this.state.granularity} interval={this.state.page} onClick={this.handleGranularity}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
export default ControlPanel;