import React from 'react';
import {Link} from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import './Navbar.css';

import authReqs from '../../firebase/auth';

class Navbar extends React.Component {
  render () {
    const {signOff, authed} = this.props;
    const logout = (e) => {
      authReqs
        .logout()
        .then(signOff)
        .catch(err => {
          console.error('Error logging out', err);
        });
    };

    return (
      <div className="Navbar">
        <nav className="navbar navbar-static-top navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">Constituency</Link>
            </div>

            {
              authed ? (
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul onClick={this.toggle} className="nav navbar-nav navbar-left">
                    <NavLink to="/bills"><span className="glyphicon glyphicon-inbox"></span> Bills</NavLink>
                    <NavLink to="/votes"><span className="glyphicon glyphicon-check"></span> Votes</NavLink>
                  </ul>
                  <ul onClick={this.toggle} className="nav navbar-nav navbar-right">
                    <li><a href='' onClick={logout}><span className="glyphicon glyphicon-user"></span> Logout</a></li>
                  </ul>
                </div>
              ) : (
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span className="glyphicon glyphicon-user"></span> Login</Link></li>
                  </ul>
                </div>
              )
            }
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
