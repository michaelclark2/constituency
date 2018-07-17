import React from 'react';
import './Vote.css';
import authReqs from '../../firebase/auth';
import {updateVote} from '../../firebase/votes';

class Vote extends React.Component {
  changePosition = (e) => {
    const {vote} = this.props;
    updateVote(vote)
      .then(res => {
        this.props.refresh();
      })
      .catch(err => {
        console.error('Error updating vote');
      });
  }
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
    if (vote.uid === authReqs.getUid()) {
      return (
        <div className="Vote col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{vote.billNumber}</h3>
              {
                vote.position ? (
                  <button className="btn btn-primary pull-right" onClick={this.changePosition}>Yes</button>
                ) : (
                  <button className="btn btn-danger pull-right" onClick={this.changePosition}>No</button>
                )}
            </div>
            <div className="panel-body">
              <h2>{vote.billTitle}</h2>
              <p>For: {countVotes().for}</p>
              <p>Against: {countVotes().against}</p>
            </div>
          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }
};

export default Vote;
