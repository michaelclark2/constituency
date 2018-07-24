import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import './VoteComparison.css';

import BillVoteTally from '../BillVoteTally/BillVoteTally';

import {getVoteData} from '../../firebase/votes';

class VoteComparison extends React.Component {
  state = {
    voteInfo: {},
    memberPositions: [],
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
    const {voteInfo} = this.state;
    const memberPositions = voteInfo.positions.filter(member => {
      if (
        (Number(member.district) === user.district && member.state === user.state) ||
        (member.state === user.state && voteInfo.chamber === 'Senate')
      ) {
        return true;
      }
      return false;
    });
    this.setState({memberPositions});
  }
  render () {
    const {vote, user, userVotes} = this.props;
    const {voteInfo, memberPositions} = this.state;
    let userVote = {};
    if (userVotes.length && user.uid) {
      userVote = {...userVotes.find(x => x.uid === user.uid)};
      userVote.position = userVote.position ? 'Yes' : 'No';
    }
    let voteComparisons = [];
    if (memberPositions) {
      voteComparisons = memberPositions.map(member => {
        return (
          <div key={member.member_id} className="col-sm-4">
            <div className={
              userVote && userVote.position === member.vote_position ? (
                'panel panel-info'
              ) : (
                'panel panel-danger'
              )
            }>
              <div className="panel-heading clearfix">
                <h2 className="panel-title text-center">
                  <Link to={'/rep/' + member.member_id}>{member.name}</Link>
                </h2>
              </div>
              <div className="panel-body">
                <p>Voted {member.vote_position}</p>
              </div>
            </div>
          </div>
        );
      });
    }
    if (voteInfo && memberPositions.length) {
      return (
        <div className="VoteComparison col-sm-10 col-sm-offset-1">
          <div className="panel panel-default">
            <div className="panel-heading clearfix">
              <h2 className="panel-title pull-left">
                <strong>{moment(voteInfo.date).format('LL')}</strong>
              </h2>
              <h2 className="panel-title pull-right">
                {voteInfo.question}
              </h2>
            </div>
            <div className="panel-body">
              {voteComparisons}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="VoteComparison col-sm-10 col-sm-offset-1">
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h2 className="panel-title pull-left">
              <strong>{moment(vote.date).format('LL')}</strong>&nbsp;{vote.chamber}
            </h2>
            <h2 className="panel-title pull-right">
              {vote.question}
            </h2>
          </div>
          <div className="panel-body">
            <div className="col-md-12">
              {
                vote.result.includes('Passed') ? (
                  <h2 className="text-success">{vote.result}</h2>
                ) : (
                  <h2>{vote.result}</h2>
                )
              }
            </div>
            <div className="col-md-12">
              <BillVoteTally yes={vote.total_yes} no={vote.total_no} absent={vote.total_not_voting} />
              <p>Yes: {vote.total_yes} No: {vote.total_no} Not voting: {vote.total_not_voting}</p>
            </div>
            <div className="col-md-12">
              {
                vote.question.includes('Pass') ? (
                  <button onClick={this.getVote} className="btn btn-info">Compare Votes</button>
                ) : (
                  ''
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default VoteComparison;
