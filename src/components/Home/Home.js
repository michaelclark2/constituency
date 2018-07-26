import React from 'react';
import './Home.css';

class Home extends React.Component {
  render () {
    return (
      <div className="Home text-center clearfix">
        <div className="jumbotron">
          <div className="container">
            <h1>Constituency</h1>
            <p>From the congressional floor to your fingertips</p>
            <ul>
              <li>Voice your opinion by voting on bills</li>
              <li>Chat with others in your voting district</li>
              <li>View recent congressional activities on bills</li>
              <li>View contribution info on your representatives</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
