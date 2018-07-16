import React from 'react';
import moment from 'moment';
import Parser from 'html-react-parser';
import './Bill.css';

class Bill extends React.Component {
  render () {
    const {bill} = this.props;
    if (bill.range) {
      return (
        <div className="Bill col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{bill.bill_number}</h3>
            </div>
            <div className="panel-body">
              <h2>{bill.short_title}</h2>
              <p><strong>Summary: </strong>{bill.chamber === 'senate' ? Parser(bill.context) : Parser(bill.description)}</p>
              <p><strong>Introduced: </strong>{moment(bill.introduced_date).format('LL')}</p>
              <p><strong>Scheduled for: </strong>{moment(bill.legislative_day).format('LL')}: {bill.consideration}</p>
            </div>
            <h1 className="text-center">Cast your vote!</h1>
            <div className="panel-footer">
              <button className="btn btn-primary pull-left">Yes</button>
              <button className="btn btn-danger pull-right">No</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="Bill col-xs-12">
        <div className="panel panel-default clearfix">
          <div className="panel-heading clearfix">
            <h3 className="pull-left">{bill.number}</h3>
            <h3 className="pull-right">{bill.sponsor_title} {bill.sponsor_name}, {bill.sponsor_state} <em>with {bill.cosponsors} cosponsors</em></h3>
          </div>
          <div className="panel-body">
            <h2>{bill.short_title}</h2>
            <p><strong>Summary: </strong>{bill.summary_short ? Parser(bill.summary_short) : 'No summary currently available'}</p>
            <p><strong>Committees: </strong>{bill.committees}</p>
            <p><strong>Introduced: </strong>{moment(bill.introduced_date).format('LL')}</p>
            <p><strong>Passage: </strong>Sen: {bill.senate_passage ? moment(bill.senate_passage).format('LL') : 'No Data'} HoR: {bill.house_passage ? moment(bill.house_passage).format('LL') : 'No Data'}</p>
            <p><strong>Latest Action: </strong>{moment(bill.latest_major_action_date).format('LL')}: {bill.latest_major_action}</p>
          </div>
          <h1 className="text-center">Cast your vote!</h1>
          <div className="panel-footer">
            <button className="btn btn-primary pull-left">Yes</button>
            <button className="btn btn-danger pull-right">No</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Bill;
