import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import ControlPanel from './controlpanel.jsx';
import { loginURL } from './configs.jsx'

const Login = React.createClass({
  getInitialState() {
    var token = localStorage.getItem('token');
    return {
      authenticate: token !== null && token !== undefined && token !== "undefined"
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    var body = JSON.stringify( { username: this.refs.username.value, password: this.refs.password.value } );
    var data = { method: 'POST', headers: headers, body: body };
    fetch(loginURL, data)
      .then( ( response ) => response.json() )
      .then( ( responseJson ) => {
        localStorage.setItem('token', responseJson.token);
        var token = localStorage.getItem('token');
        this.setState({ authenticate: token !== null && token !== undefined && token !== "undefined" });
      })
      .catch((error) => {
        console.error(error);
        localStorage.clear();
        var token = localStorage.getItem('token');
        this.setState({ authenticate: token !== null && token !== undefined && token !== "undefined" });
      });

  },
  render () {
    if ( this.state.authenticate ) return <ControlPanel />;
    return  <div className="container">
              <div className="row">
              <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h1 className="display-3">Login</h1>
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                      <label htmlFor="usernameInput">Username</label>
                      <input type="text" className="form-control" id="usernameInput" aria-describedby="username" placeholder="Username" ref="username"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordInput">Password</label>
                      <input type="password" className="form-control" id="passwordInput" placeholder="Password" ref="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                  </form>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>;
  }

});

export default Login;