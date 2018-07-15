import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

import authReqs from '../../firebase/auth';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  }
  onSignInClick = (e) => {
    e.preventDefault();
    const {user} = this.state;
    authReqs
      .loginUser(user)
      .then(user => {
        this.props.history.push('/bills');
      })
      .catch(err => {
        console.error('There was an error logging in', err);
      });
  }
  onInputChange = (e) => {
    const {user} = {...this.state};
    user[e.target.type] = e.target.value;
    this.setState({user});
  }
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
                    <input onChange={this.onInputChange} value={this.state.user.email} type="email" className="form-control text-center" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onInputChange} value={this.state.user.password} type="password" className="form-control text-center" placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button onClick={this.onSignInClick} type="submit" className="btn btn-default">Sign in</button>
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
