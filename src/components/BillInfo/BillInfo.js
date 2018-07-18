import React from 'react';
import moment from 'moment';
import Parser from 'html-react-parser';
import './BillInfo.css';

import BillTallyBar from '../BillTallyBar/BillTallyBar';

class BillInfo extends React.Component {
  render () {
    const {bill} = this.props;
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
          <p>{bill.committees}</p>
          <h3>Summary</h3>
          <div className="col-xs-3 col-xs-offset-3">
            <h4>Introduced: </h4>
            <strong>{moment(bill.introduced_date).format('LL')}</strong>
          </div>
          <div className="col-xs-3">
            <h4>Passage: </h4>
            <h5>Sen: <strong>{bill.senate_passage ? moment(bill.senate_passage).format('LL') : 'No Data'}</strong></h5>
            <h5>HoR: <strong>{bill.house_passage ? moment(bill.house_passage).format('LL') : 'No Data'}</strong></h5>
          </div>
          <div className="col-xs-12">
            <p className="text-left">{bill.summary ? Parser(bill.summary) : 'No summary currently available'}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default BillInfo;
