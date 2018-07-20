import React from 'react';
import {isEqualVotes} from '../../helpers';
import './Ballot.css';

import {castVote} from '../../firebase/votes';
import authReqs from '../../firebase/auth';

class Ballot extends React.Component {
  state = {
    isCast: false,
    vote: {},
  }
  componentDidMount () {
    this.checkVotes();
  }
  componentDidUpdate (prevProps) {
    if (!isEqualVotes(this.props.votes, prevProps.votes)) {
      this.checkVotes();
    }
  }
  checkVotes = () => {
    const {votes, bill} = this.props;
    const isVoted = votes.find(x => {
      if ((x.billSlug === bill.bill_slug) && (x.uid === authReqs.getUid())) {
        return x;
      }
      return null;
    });
    if (isVoted) {
      this.setState({isCast: true, vote: isVoted});
    }
  }
  castBallot = (e) => {
    const {bill, updateVotes} = this.props;
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
        updateVotes();
      })
      .catch();
  };
  render () {
    return (
      <div className="Ballot">
        {
          this.state.isCast ? (
            <div>
              {
                this.state.vote.position ? (
                  'You voted For'
                ) : (
                  'You voted Against'
                )
              }
            </div>
          ) : (
            <div>
              <button onClick={this.castBallot} className="btn btn-primary pull-left" id="yes">Yea</button>
              <button onClick={this.castBallot} className="btn btn-danger pull-right" id="no">Nay</button>
            </div>
          )
        }
      </div>
    );
  }
};

export default Ballot;
