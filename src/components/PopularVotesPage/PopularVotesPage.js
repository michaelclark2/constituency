import React from 'react';
import './PopularVotesPage.css';

import {getPopularVotes, getVotes} from '../../firebase/votes';
import Vote from '../Vote/Vote';

class PopularVotesPage extends React.Component {
  state = {
    votes: [],
    allVotes: [],
  }
  componentDidMount () {
    getPopularVotes()
      .then(votes => {
        getVotes()
          .then(allVotes => {
            this.setState({votes, allVotes});
          });
      })
      .catch(err => {
        console.error('Error getting popular votes', err);
      });

  }
  render () {
    const votes = this.state.votes.map(vote => {
      return (
        <Vote
          key={vote.id}
          vote={vote}
          allVotes={this.state.allVotes}
          url={this.props.location.pathname}
        />
      );
    });
    return (
      <div className="PopularVotesPage container">
        <h1 className="text-center">Most Popular Bills</h1>
        {votes}
      </div>
    );
  }
};

export default PopularVotesPage;
