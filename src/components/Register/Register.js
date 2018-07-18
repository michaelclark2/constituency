import React from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
import authReqs from '../../firebase/auth';
import userReqs from '../../firebase/users';
import formatAddress from '../../helpers';

class Register extends React.Component {
  state = {
    isError: false,
    errorMsg: '',
    user: {
      email: '',
      username: '',
      password: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  }
  onEmail = (e) => {
    const {user} = {...this.state};
    user.email = e.target.value;
    this.setState({user});
  }
  onUserName = (e) => {
    const {user} = {...this.state};
    user.username = e.target.value;
    this.setState({user});
  }
  onPassword = (e) => {
    const {user} = {...this.state};
    user.password = e.target.value;
    this.setState({user});
  }
  onStreet = (e) => {
    const {user} = {...this.state};
    user.street = e.target.value;
    this.setState({user});
  }
  onCity = (e) => {
    const {user} = {...this.state};
    user.city = e.target.value;
    this.setState({user});
  }
  onState = (e) => {
    const {user} = {...this.state};
    user.state = e.target.value;
    if (e.target.value.length <= 2) {
      this.setState({user});
    }
  }
  onZip = (e) => {
    const {user} = {...this.state};
    const zip = Number(e.target.value) || '';
    user.zip = zip;
    if (e.target.value.length <= 5 && !isNaN(zip)) {
      this.setState({user});
    }
  }
  onRegisterClick = (e) => {
    e.preventDefault();
    const {user} = this.state;
    userReqs.getDistrictByAddress(formatAddress(user))
      .then(stateAndDistrict => {
        authReqs.registerUser(user)
          .then(res => {
            const userObj = {
              ...stateAndDistrict,
              username: user.username,
              uid: authReqs.getUid(),
            };
            userReqs
              .postUser(userObj)
              .then(() => {
                this.props.history.push('/bills');
              })
              .catch(err => {
                console.error('Error posting user data', err);
              });
          })
          .catch(err => {
            this.setState({isError: true, errorMsg: err.message});
          });
      })
      .catch(err => {
        this.setState({isError: true, errorMsg: 'Please enter a valid mailing address'});
        console.error('error in user registration', err);
      });
  }
  componentWillUnmount () {
    this.setState({isError: false, errorMsg: ''});
  }
  render () {
    return (
      <div className="Register container">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-primary text-center">
            <div className="panel-body">
              <h1>Register</h1>
              {
                this.state.isError ? (
                  <div className="alert alert-danger">
                    {this.state.errorMsg}
                  </div>
                ) : (
                  ''
                )
              }
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onEmail} value={this.state.user.email} type="email" className="form-control text-center" placeholder="Email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onUserName} value={this.state.user.username} type="text" className="form-control text-center" placeholder="Name" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onPassword} value={this.state.user.password} type="password" className="form-control text-center" placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <p className="help-block">Please enter the address on your voter registration.<br/>This information is used to determine your congressional district.</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onStreet} value={this.state.user.street} type="text" className="form-control text-center" placeholder="Street Address" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input onChange={this.onCity} value={this.state.user.city} type="text" className="form-control text-center" placeholder="City" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-7">
                    <input onChange={this.onState} value={this.state.user.state} type="text" className="form-control text-center" placeholder="State" />
                  </div>
                  <div className="col-sm-5">
                    <input onChange={this.onZip} value={this.state.user.zip} type="text" className="form-control text-center" placeholder="Zip Code" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <button onClick={this.onRegisterClick} type="submit" className="btn btn-default">Create Account</button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <Link to="/login">Already have an account?</Link>
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

export default Register;
