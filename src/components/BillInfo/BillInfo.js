import React from 'react';
import moment from 'moment';
import Parser from 'html-react-parser';
import './BillInfo.css';

import BillTallyBar from '../BillTallyBar/BillTallyBar';

class BillInfo extends React.Component {
  render () {
    const {bill} = this.props;
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
          <BillTallyBar bill={bill} votes={this.props.votes} />
        </div>
        <div className="bill-body text-center col-xs-12">
          <h3>Committees</h3>
          <h4>{bill.committees}</h4>
          <h3>Summary</h3>
          <div className="col-xs-12">
            <p className="text-left">{bill.summary ? Parser(bill.summary) : 'No summary currently available'}</p>
          </div>
          <div className="col-xs-12">
            <h3>Recent Activity</h3>
            <div className="activity-container">
              {actionComponents}
            </div>
          </div>
          <div className="col-xs-12">
            <h3>Leave a Comment</h3>
            <div className="message-container">
              {/* messages component goes here */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BillInfo;
