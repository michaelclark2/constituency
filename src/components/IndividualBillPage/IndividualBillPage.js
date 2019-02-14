import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Parser from 'html-react-parser';
import './IndividualBillPage.scss';

import Ballot from '../Ballot/Ballot';
import MessageBoard from '../MessageBoard/MessageBoard';

import {getIndividualBill} from '../../apicalls/propublica';
import {getVotesBySlug} from '../../firebase/votes';
import userReqs from '../../firebase/users';
import authReqs from '../../firebase/auth';
import VoteComparison from '../VoteComparison/VoteComparison';

class IndividualBillPage extends React.Component {
  state = {
    bill: {},
    user: {},
    votes: [],
  }
  componentDidMount () {
    // Gets bill info from ProPublica Congress API
    getIndividualBill(this.props.location.uri)
      .then(bill => {
        // get users votes
        getVotesBySlug(bill.bill_slug)
          .then(votes => {
            // Gets current user
            userReqs
              .getUserInfo(authReqs.getUid())
              .then(user => {
                this.setState({user, bill, votes});
              })
              .catch(err => {
                console.error('Error getting user info', err);
              });
          })
          .catch(err => {
            console.error('Error on individual bill page', err);
          });
      })
      .catch(err => {
        console.error('Error getting individual bill', err);
      });
  }
  updateVotes = () => {
    const {bill} = this.state;
    getVotesBySlug(bill.bill_slug)
      .then(votes => {
        this.setState({votes});
      })
      .catch(err => {
        console.error('Error getting votes by bill slug');
      });
  }
  render () {
    const {bill, user, votes} = this.state;
    let actionComponents = [];
    let voteComponents = [];
    if (bill.actions) {
      actionComponents = bill.actions.map(action => {
        return (
          <div key={action.id} className="col-sm-10 col-sm-offset-1">
            <div className="panel panel-default">
              <div className="panel-heading clearfix">
                <h2 className="panel-title pull-left"><strong>{moment(action.datetime).format('LL')}</strong></h2>
                <h2 className="panel-title pull-right"><em> {action.chamber} {action.action_type}</em></h2>
              </div>
              <div className="panel-body">
                <p>{action.description}</p>
              </div>
            </div>
          </div>
        );
      });
    }
    if (bill.votes && user.uid) {
      voteComponents = bill.votes.map(vote => {
        return (
          <VoteComparison
            key={vote.roll_call}
            vote={vote}
            userVotes={this.state.votes}
            user={this.state.user}
          />
        );
      });
    }
    return (
      <div className="IndividualBillPage container">
        <div className="bill-title text-center col-xs-12 clearfix">
          <div className="clearfix">
            <h1 className="bill-number pull-left">{bill.number}</h1>
            <h3 className="pull-right">
              <Link
                to={'/rep/' + bill.sponsor_id}>
                {bill.sponsor_title} {bill.sponsor_name || bill.sponsor}, {bill.sponsor_state}
              </Link> <em>with {bill.cosponsors} cosponsors</em>
            </h3>
          </div>
          <div className="text-left">
            <h4>{bill.committees}</h4>
            <h2>{bill.title}</h2>
          </div>
          <Ballot
            bill={bill}
            votes={votes}
            updateVotes={this.updateVotes}
          />
        </div>
        <div className="bill-body text-center clearfix">
          <div className="col-xs-12 summary">
            <h3 className="section-heading">Summary</h3>
            {
              bill.summary ? (
                <p className="text-left">{Parser(bill.summary)}</p>
              ) : (
                <p>No summary currently available</p>
              )
            }

            <a className="btn btn-info" target="_blank" href={bill.congressdotgov_url + '/text'}>View Full Bill Text</a>
          </div>
          <div className="col-xs-12 activity-container">
            <h3 className="section-heading">Bill History</h3>
            <div className="activities clearfix">
              {actionComponents}
            </div>
          </div>
          {
            voteComponents.length ? (
              <div className="col-xs-12 votes">
                <h3 className="section-heading">Vote History</h3>
                {voteComponents}
              </div>
            ) : (
              ''
            )
          }
          <div className="col-xs-12 messages">
            <h3 className="section-heading">Leave a Comment</h3>
            <MessageBoard
              bill={bill}
              votes={votes}
              user={this.state.user}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default IndividualBillPage;
