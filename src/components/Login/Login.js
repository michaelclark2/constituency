import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  render () {
    return (
      <div className="Login container">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-primary text-center">
            <div className="panel-body">
              <h1>Login</h1>
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-sm-12">
                    <input type="email" className="form-control text-center" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input type="password" className="form-control text-center" placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-default">Sign in</button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <Link to="/register">Don't have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
