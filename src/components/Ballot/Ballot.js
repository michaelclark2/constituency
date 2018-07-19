import React from 'react';
import './Ballot.css';

import {castVote} from '../../firebase/votes';
import authReqs from '../../firebase/auth';

class Ballot extends React.Component {
  state = {
    isCast: false,
  }
  componentDidMount () {
    const {bill, votes} = this.props;
    this.isVoted = votes.find(x => {
      if ((x.billSlug === bill.bill_slug) && (x.uid === authReqs.getUid())) {
        return x;
      }
      return null;
    });
    if (this.isVoted) {
      this.setState({isCast: true});
    }
  }
  render () {
    const {bill, updateVotes} = this.props;
    const castBallot = (e) => {
      const vote = {
        uid: authReqs.getUid(),
        position: e.target.id === 'yes',
        billTitle: bill.title || (bill.context || bill.description),
        billSlug: bill.bill_slug,
        billNumber: bill.number || bill.bill_number,
        billUri: bill.bill_uri || bill.api_uri,
      };
      castVote(vote)
        .then(() => {
          return updateVotes();
        })
        .catch();
    };
    return (
      <div className="Ballot">
        {
          this.state.isCast ? (
            <div>
              {
                this.isVoted.position ? (
                  'You voted For'
                ) : (
                  'You voted Against'
                )
              }
            </div>
          ) : (
            <div>
              <button onClick={castBallot} className="btn btn-primary pull-left" id="yes">Yea</button>
              <button onClick={castBallot} className="btn btn-danger pull-right" id="no">Nay</button>
            </div>
          )
        }
      </div>
    );
  }
};

export default Ballot;
