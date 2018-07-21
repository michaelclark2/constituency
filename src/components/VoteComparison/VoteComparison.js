import React from 'react';
import './VoteComparison.css';

import {getVoteData} from '../../firebase/votes';

class VoteComparison extends React.Component {
  state = {
    voteInfo: {},
  }
  componentDidMount () {
    this.getVote();
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.voteInfo !== prevState.voteInfo) {
      this.buildComponents();
    }
  }
  getVote = () => {
    getVoteData(this.props.vote.api_url)
      .then(voteInfo => {
        this.setState({voteInfo});
      });
  }
  buildComponents = () => {
    const {user} = this.props;
    const voteComparisons = this.state.voteInfo.positions.filter(member => {
      if (Number(member.district) === user.district && member.state === user.state) {
        return true;
      }
      return false;
    });
    this.setState({voteComparisons});
  }
  render () {
    const {user} = this.props;
    return (
      <div className="VoteComparison">
        {user.username}
        {this.state.voteComparisons ? (this.state.voteComparisons.map(vote => <div>{vote.name}</div>)) : ('')}
      </div>
    );
  }
};

export default VoteComparison;
