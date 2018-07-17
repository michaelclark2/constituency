import React from 'react';
import './Home.css';
import america from './img/america.svg';

class Home extends React.Component {
  render () {
    return (
      <div className="Home text-center">
        <img src={america} alt=""/>
        <div className="jumbotron">
          <div className="container">
            <h1>Constituency</h1>
            <p>From the congressional floor to your fingertips</p>
            <div className="col-md-8 col-md-offset-2">
              <ul>
                <li>Voice your opinion by voting on bills</li>
                <li>Chat with others in your voting district</li>
                <li>View recent congressional activities on bills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
