import React from 'react';
import {isEqualVotes} from '../../helpers';
import './Ballot.css';

import VoteTallyBar from '../VoteTallyBar/VoteTallyBar';

import {castVote} from '../../firebase/votes';
import authReqs from '../../firebase/auth';

import PropTypes from 'prop-types';
import { voteShape } from '../../props/votes';

class Ballot extends React.Component {
  static propTypes = {
    votes: PropTypes.arrayOf(voteShape),
    updateVotes: PropTypes.func,
  }
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
      .then(res => {
        updateVotes();
      })
      .catch(err => {
        console.error('Error sending vote', err);
      });
  };
  render () {
    return (
      <div className="Ballot">
        {
          this.state.isCast ? (
            <div>
              <VoteTallyBar
                vote={this.state.vote}
                allVotes={this.props.votes}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-center">Cast your Vote!</h1>
              <button
                onClick={this.castBallot}
                className="for btn btn-primary pull-left"
                id="yes">
                Yea
              </button>
              <button
                onClick={this.castBallot}
                className="against btn btn-danger pull-right"
                id="no">
                Nay
              </button>
            </div>
          )
        }
      </div>
    );
  }
};

export default Ballot;
