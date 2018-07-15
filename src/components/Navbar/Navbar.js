import React from 'react';
import './Navbar.css';

import authReqs from '../../firebase/auth';

class Navbar extends React.Component {
  render () {
    const {signOff} = this.props;
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
        <h1>Navbar</h1>
        <button onClick={logout} className="btn">Logout</button>
      </div>
    );
  }
};

export default Navbar;
