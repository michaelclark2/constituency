import React from 'react';
import './BillTallyBar.css';

class BillTallyBar extends React.Component {
  render () {
    const {votes} = this.props;
    const countVotes = () => {
      const votePositions = {
        for: 0,
        against: 0,
      };
      votes.forEach(currVote => {
        if (currVote.position) {
          votePositions.for++;
        } else if (!currVote.position) {
          votePositions.against++;
        }
      });
      return votePositions;
    };
    const voteTally = countVotes();
    const totalVotes = voteTally.for + voteTally.against;
    const percentFor = (voteTally.for / totalVotes) * 100;
    const percentAgainst = (voteTally.against / totalVotes) * 100;

    return (
      <div className="BillTallyBar">
        <div className="tally">
          <div className="for" style={{width: percentFor.toFixed(2) + '%'}}>
            {percentFor.toFixed(0)}%
          </div>
          <div className="against" style={{width: percentAgainst.toFixed(2) + '%'}}>
            {percentAgainst.toFixed(0)}%
          </div>
        </div>
        <h6>Total votes: {totalVotes}</h6>
      </div>
    );
  }
};

export default BillTallyBar;
