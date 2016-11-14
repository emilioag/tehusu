import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import Login from './login.jsx'


const App = React.createClass({
  getInitialState() {
    return { };
  },
  render () {
    return <Login />;
  }
});


export default App;