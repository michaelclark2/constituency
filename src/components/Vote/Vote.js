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
              {
                vote.position ? (
                  <button className="btn btn-primary pull-right" onClick={this.changePosition}>Yes</button>
                ) : (
                  <button className="btn btn-danger pull-right" onClick={this.changePosition}>No</button>
                )}
            </div>
            <div className="panel-body">
              <h2><Link to={{pathname: '/bill/' + vote.billSlug, uri: vote.billUri}} >{vote.billTitle}</Link></h2>
              <VoteTallyBar props={this.props} />
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
