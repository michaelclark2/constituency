import React from 'react';
import {Link} from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import './Navbar.scss';

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
              <Link to="/" className="navbar-brand">Constituency</Link>
            </div>

            {
              authed ? (
                <div>
                  <ul className="nav navbar-nav navbar-left">
                    <NavLink to="/bills"><span className="glyphicon glyphicon-inbox"></span> Bills</NavLink>
                    <NavLink to="/votes"><span className="glyphicon glyphicon-check"></span> Votes</NavLink>
                    <NavLink to="/popular"><span className="glyphicon glyphicon-fire"></span> Popular Bills</NavLink>
                  </ul>
                  <ul onClick={this.toggle} className="nav navbar-nav navbar-right">
                    <li><a href='' onClick={logout}><span className="glyphicon glyphicon-user"></span> Logout</a></li>
                  </ul>
                </div>
              ) : (
                <div>
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
