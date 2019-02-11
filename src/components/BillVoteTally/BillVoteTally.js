import React from 'react';
import './BillVoteTally.scss';

class BillVoteTally extends React.Component {
  render () {
    const {yes, no, absent} = this.props;
    const votePositions = {
      for: yes,
      against: no,
      absent: absent,
    };
    const totalVotes = votePositions.for + votePositions.against + votePositions.absent;
    let percentFor = ((votePositions.for / totalVotes) * 100).toFixed(2) * 1;
    let percentAgainst = ((votePositions.against / totalVotes) * 100).toFixed(2) * 1;
    let percentAbsent = ((votePositions.absent / totalVotes) * 100).toFixed(2) * 1;
    if (percentFor + percentAgainst + percentAbsent > 100) {
      percentFor = Math.floor(percentFor);
      percentAgainst = Math.floor(percentAgainst);
      percentAbsent = Math.floor(percentAbsent);
    }
    return (
      <div className="BillVoteTally">
        <div className="tally">
          <div className="for" style={{width: percentFor + '%'}}>
            {percentFor.toFixed(0)}%
          </div>
          <div className="against" style={{width: percentAgainst + '%'}}>
            {percentAgainst.toFixed(0)}%
          </div>
          <div className="absent" style={{width: percentAbsent + '%'}}>
            {
              percentAbsent > 2 ?
                (
                  percentAbsent.toFixed(0) + '%'
                ) : (
                  ''
                )
            }
          </div>
        </div>
      </div>
    );
  }
};

export default BillVoteTally;
