import React from 'react';
import moment from 'moment';
import { itemStyle, selectedItem, alink, alinkClicked } from './monthlystyle.jsx'

const TabMenu = React.createClass({
  model: [
    { _id: "daily", tag: "Daily" },
    { _id: "weekly", tag: "Weekly" },
    { _id: "monthly", tag: "Monthly" },
    { _id: "yearly", tag: "Yearly" }
  ],
  getInitialState() {
    return {
      clicked: "daily",
    }
  },
  componentWillMount( ) {
  },
  handleClick(e) {
    this.setState({'clicked': e.target.id});
    this.props.onClick(e.target.id);
  },
  render () {
    let menu = this.model.map(item => {
      let stl = itemStyle,
          astl = alink;
      if ( item._id === this.state.clicked ) {
        stl = selectedItem;
        astl = alinkClicked;
      };
      return  <div key={item._id} className="col-md-3" style={stl}>
                <a id={item._id} href="#" onClick={ this.handleClick } style={astl}>{item.tag}</a>
              </div>;
    });
    return (<div>{menu}</div>);
  }
});

export default TabMenu;