import React from 'react';
import {Link} from 'react-router-dom';
import './Vote.css';
import authReqs from '../../firebase/auth';
import {updateVote} from '../../firebase/votes';
import VoteTallyBar from '../VoteTallyBar/VoteTallyBar';

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
    const {vote} = this.props;
    if (vote.uid === authReqs.getUid()) {
      return (
        <div className="Vote col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{vote.billNumber}</h3>
              <div className="pull-right">
                You voted: &nbsp;
                {
                  vote.position ? (
                    <button className="btn btn-primary" onClick={this.changePosition}>Yes</button>
                  ) : (
                    <button className="btn btn-danger" onClick={this.changePosition}>No</button>
                  )
                }
              </div>
            </div>
            <div className="panel-body">
              <h2><Link to={{pathname: '/bill/' + vote.billSlug, uri: vote.billUri}} >{vote.billTitle}</Link></h2>
              <VoteTallyBar vote={this.props.vote} allVotes={this.props.allVotes} />
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
