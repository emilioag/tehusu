import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';

const barHeight = '2em';
const selectedMark = '.3em';

const ItemStyle = {
  fontFamily: 'Lato',
  fontWeight: '100',
  cursor: 'pointer',
  color: '#F6F6E8',
  padding: '.2em',
  textAlign: 'center',
  height: barHeight
};
const ItemHoverStyle = {
  fontFamily: 'Lato',
  cursor: 'pointer',
  color: '#D43F3F',
  padding: '.2em',
  textAlign: 'center',
  height: barHeight,
};
const ItemSelectedStyle = {
  fontFamily: 'Lato',
  fontWeight: '100',
  cursor: 'pointer',
  backgroundColor: '#404040', // #D43F3F Azul // #00ACE9 Rojo // #6A9A1F verde // #F6F6E8 beige
  color: '#F6F6E8',
  padding: '.2em',
  textAlign: 'center',
  borderBottom: 'solid ' + selectedMark,
  height: barHeight
};
const MenuItem = React.createClass({
  getInitialState() {
    return {
      style: ItemStyle,
      clicked: false
    };
  },
  componentWillMount( ) {
    this.setState({
      style: this.props.clicked ? ItemSelectedStyle : ItemStyle,
      clicked: this.props.clicked
    })
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      style: nextProps.clicked ? ItemSelectedStyle : ItemStyle,
      clicked: nextProps.clicked
    })
  },
  onMouseOut ( ) {
    this.setState({
      style: this.props.clicked ? ItemSelectedStyle : ItemStyle
    });
  },
  onMouseOver ( ) {
    this.setState( { style: ItemHoverStyle } );
  },
  onClick ( ) {
    this.setState( { style: ItemSelectedStyle, clicked: true } );
    this.props.onClick( this.props.id );
  },
  render ( ) {
    return <div className="col-md-3"
                style={ this.state.style }
                onMouseOver={ this.onMouseOver }
                onMouseOut={ this.onMouseOut }
                onClick={ this.onClick }>{ this.props.label }</div>;
  }
});

<MenuItem name=""/>

const MenuBar = React.createClass({
  getInitialState() {
    return {
      clicked: null
    };
  },
  componentWillMount( ) {
    this.setState({clicked: this.props.model[0]._id});
  },
  logout () {
    this.props.logout();
  },
  onMouseOver () {
    console.log("lalalaalal")
  },
  handleClick ( itemId ) {
    this.props.onClick(itemId);
    this.setState({clicked: itemId});
  },
  render () {
    const menuBarStyle = {
      backgroundColor: '#404040',
      marginBottom: '2em',
      paddingLeft: '2em',
      height: barHeight
    }
    const menuNonSelected = {
      textAlign: 'right',
      fontFamily: 'Lato',
      fontWeight: '300',
      padding: '.2em',
    }
    const textBar = {
      color: '#D43F3F',
      textDecoration: 'none'
    }
    let items = this.props.model.map(item => {
      let clicked = false;
      if ( this.state.clicked === item._id ) clicked = true;
      return <MenuItem key={ item._id } id={ item._id } label={ item.label } clicked={ clicked } onClick={ this.handleClick } />
    });
    return  <div className="container" style={menuBarStyle}>
              <div className="row">
                <div className="col-md-9">
                    { items }
                </div>
                <div className="col-md-3" style={ menuNonSelected }>
                  <div className="col-md-12">
                    <a href="#" onClick={ this.logout } style={ textBar }>LOGOUT <i className="fa fa-sign-out" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>;
  }

});

export default MenuBar;