import React from 'react';
import moment from 'moment';
import Parser from 'html-react-parser';
import './BillInfo.css';

import BillTallyBar from '../BillTallyBar/BillTallyBar';
import Ballot from '../Ballot/Ballot';
import MessageBoard from '../MessageBoard/MessageBoard';

class BillInfo extends React.Component {
  updateAllVotes = () => {
    this.props.updateVotes();
  }
  render () {
    const {bill, votes} = this.props;
    let actionComponents = [];
    if (bill.actions) {
      actionComponents = bill.actions.map(action => {
        return (
          <div key={action.id} className="col-sm-8 col-sm-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title">
                  <strong>{moment(action.datetime).format('LL')}</strong>
                  <em> {action.chamber} {action.action_type}</em>
                </h2>
              </div>
              <div className="panel-body">
                <p>{action.description}</p>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="BillInfo container">
        <div className="bill-title text-center col-xs-12">
          <h1>{bill.number}</h1>
          <h2>{bill.sponsor_title} {bill.sponsor_name || bill.sponsor}, {bill.sponsor_state} <em>with {bill.cosponsors} cosponsors</em></h2>
          <h2>{bill.title}</h2>
          <BillTallyBar bill={bill} votes={votes} />
          <Ballot bill={bill} votes={votes} updateVotes={this.updateAllVotes}/>
        </div>
        <div className="bill-body text-center col-xs-12">
          <div className="col-xs-12">
            <h3>Committees</h3>
            <h4>{bill.committees}</h4>
          </div>
          <div className="col-xs-12">
            <h3>Summary</h3>
            <p className="text-left">{bill.summary ? Parser(bill.summary) : 'No summary currently available'}</p>
            <a className="btn btn-info" href={bill.congressdotgov_url + '/text'}>View Full Bill Text</a>
          </div>
          <div className="col-xs-12">
            <h3>Bill History</h3>
            <div className="activity-container">
              {actionComponents}
            </div>
          </div>
          <div className="col-xs-12">
            <h3>Leave a Comment</h3>
            <MessageBoard bill={bill} votes={votes} />
          </div>
        </div>
      </div>
    );
  }
};

export default BillInfo;
