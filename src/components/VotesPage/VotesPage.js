import React from 'react';
import './VotesPage.css';
import {getVotes} from '../../firebase/votes';
import Vote from '../Vote/Vote';

class VotesPage extends React.Component {
  state = {
    votes: [],
  }
  getAllVotes = () => {
    getVotes()
      .then(votes => {
        this.setState({votes});
      })
      .catch(err => {
        console.error('Error getting votes', err);
      });
  }
  componentDidMount () {
    this.getAllVotes();
  }
  render () {
    const voteComponents = this.state.votes.map(vote => {
      return (
        <Vote key={vote.id} vote={vote} allVotes={this.state.votes} refresh={this.getAllVotes} />
      );
    });
    return (
      <div className="VotesPage container-fluid">
        {voteComponents}
      </div>
    );
  }
};

export default VotesPage;
