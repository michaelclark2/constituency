import React from 'react';
import america from './img/america.svg';
import './Home.css';

class Home extends React.Component {
  render () {
    return (
      <div className="Home text-center clearfix">
        <div className="jumbotron">
          <div className="container-fluid">
            <h1>Constituency</h1>
            <p>From the congressional floor to your fingertips</p>
            <img src={america} alt="America" />
            <footer className="home-footer">
              <ul>
                <li>Vote on bills</li>
                <li>Comment on bills</li>
                <li>View recent bills</li>
                <li>See contribution information</li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
