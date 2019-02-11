import React from 'react';
import './VoteTallyBar.scss';

class VoteTallyBar extends React.Component {
  render () {
    const {vote, allVotes} = this.props;
    const countVotes = () => {
      const votePositions = {
        for: 0,
        against: 0,
      };
      allVotes.forEach(currVote => {
        if (currVote.billSlug === vote.billSlug) {
          if (currVote.position) {
            votePositions.for++;
          } else if (!currVote.position) {
            votePositions.against++;
          }
        }
      });
      return votePositions;
    };
    const voteTally = countVotes();
    const totalVotes = voteTally.for + voteTally.against;
    const percentFor = (voteTally.for / totalVotes) * 100;
    const percentAgainst = (voteTally.against / totalVotes) * 100;

    return (
      <div className="VoteTallyBar">
        <div className="tally">
          <div className="for" style={{width: percentFor.toFixed(2) + '%'}}>
            {percentFor.toFixed(0)}%
            {
              vote.position ? (
                percentFor <= 10 ? (
                  <span> agree.</span>
                ) : (
                  <span> agree with you.</span>
                )
              ) : (
                <span></span>
              )
            }
          </div>
          <div className="against" style={{width: percentAgainst.toFixed(2) + '%'}}>
            {percentAgainst.toFixed(0)}%
            {
              vote.position ? (
                <span></span>
              ) : (
                percentAgainst <= 10 ? (
                  <span> agree.</span>
                ) : (
                  <span> agree with you.</span>
                )
              )
            }
          </div>
          Total Votes: {totalVotes}
        </div>
      </div>
    );
  }
};

export default VoteTallyBar;
