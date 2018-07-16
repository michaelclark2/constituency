import React from 'react';
import './Ballot.css';

import {castVote} from '../../firebase/votes';
import authReqs from '../../firebase/auth';

class Ballot extends React.Component {
  state = {
    isCast: false,
  }
  render () {
    const {bill} = this.props;
    const castBallot = (e) => {
      const vote = {
        uid: authReqs.getUid(),
        position: e.target.id === 'yes',
        billTitle: bill.title,
        billSlug: bill.bill_slug,
        billNumber: bill.number || bill.bill_number,
        billUri: bill.bill_uri,
      };
      castVote(vote)
        .then(() => {
          this.setState({isCast: true})
        })
        .catch();
    }
    return (
      <div className="Ballot">
        <button onClick={castBallot} className="btn btn-primary pull-left" id="yes" disabled={this.state.isCast}>Yes</button>
        <button onClick={castBallot} className="btn btn-danger pull-right" id="no" disabled={this.state.isCast}>No</button>
      </div>
    );
  }
};

export default Ballot;
