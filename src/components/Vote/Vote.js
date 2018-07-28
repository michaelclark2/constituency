import React from 'react';
import {Link} from 'react-router-dom';
import './Vote.css';
import authReqs from '../../firebase/auth';
import {updateVote, deleteVote} from '../../firebase/votes';
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
  removeVote = (e) => {
    const {vote} = this.props;
    deleteVote(vote.id, vote)
      .then(() => {
        this.props.refresh();
      })
      .catch(err => {
        console.error('Error deleting vote', err);
      });
  }
  render () {
    const {vote} = this.props;
    if (this.props.url === '/votes' && vote.uid === authReqs.getUid()) {
      return (
        <div className="Vote col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{vote.billNumber}</h3>
              <div className="pull-right">
                You voted: &nbsp;
                {
                  vote.position ? (
                    <button
                      className="btn btn-primary"
                      onClick={this.changePosition}>
                      Yes
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={this.changePosition}>
                      No
                    </button>
                  )
                }
                <button
                  onClick={this.removeVote}
                  type="button"
                  className="close"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="panel-body">
              <h2>
                <Link
                  to={{pathname: '/bill/' + vote.billSlug, uri: vote.billUri}}>
                  {vote.billTitle}
                </Link>
              </h2>
            </div>
            <div className="panel-footer">
              <VoteTallyBar
                vote={this.props.vote}
                allVotes={this.props.allVotes}
              />
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.url === '/popular') {
      return (
        <div className="Vote col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{vote.billNumber}</h3>
            </div>
            <div className="panel-body">
              <h2>
                <Link
                  to={{pathname: '/bill/' + vote.billSlug, uri: vote.billUri}}>
                  {vote.billTitle}
                </Link>
              </h2>
            </div>
            <div className="panel-footer">
              <VoteTallyBar
                vote={this.props.vote}
                allVotes={this.props.allVotes}
              />
              <p className="text-center">Total Comments: {this.props.vote.comments || 0}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Vote;
