import React from 'react';
import moment from 'moment';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';
import './Bill.scss';

import Ballot from '../Ballot/Ballot';

import PropTypes from 'prop-types';
import { voteShape } from '../../props/votes';

class Bill extends React.Component {
  static propTypes = {
    votes: PropTypes.arrayOf(voteShape),
    updateVotes: PropTypes.func,
  }
  render () {
    const {bill} = this.props;
    // If bill is coming from the upcoming type it has a key of 'range'
    if (bill.range) {
      return (
        <div className="Bill col-xs-12">
          <div className="panel panel-default clearfix">
            <div className="panel-heading clearfix">
              <h3 className="pull-left">{bill.bill_number}</h3>
            </div>
            <div className="panel-body">
              <div className="col-xs-12">
                {
                  bill.chamber === 'senate' ? (
                    <h2>
                      <Link
                        to={{pathname: '/bill/' + bill.bill_slug, uri: bill.api_uri}}>
                        {Parser(bill.context)}
                      </Link>
                    </h2>
                  ) : (
                    <h2><Link to={{pathname: '/bill/' + bill.bill_slug, uri: bill.api_uri}}>{Parser(bill.description)}</Link></h2>
                  )
                }
              </div>
              <div className="col-md-6">
                <p><strong>Introduced: </strong>{moment(bill.introduced_date).format('LL')}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Scheduled for: </strong>{moment(bill.legislative_day).format('LL')} {bill.consideration}</p>
              </div>
            </div>
            <div className="panel-footer">
              <Ballot
                bill={bill}
                votes={this.props.votes}
                updateVotes={this.props.updateVotes}
              />
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
            <h3 className="pull-right">
              <Link
                to={'/rep/' + bill.sponsor_id}>
                {bill.sponsor_title} {bill.sponsor_name || bill.sponsor}, {bill.sponsor_state}
              </Link> <em>with {bill.cosponsors} cosponsors</em>
            </h3>
          </div>
          <div className="panel-body">
            <div className="col-xs-12">
              <h2>
                <Link
                  to={{pathname: '/bill/' + bill.bill_slug, uri: bill.bill_uri}}>
                  {bill.short_title}
                </Link>
              </h2>
              <p><strong>Summary: </strong>{bill.summary_short ? Parser(bill.summary_short) : 'No summary currently available'}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Committees: </strong>{Parser(bill.committees)}</p>
              <p><strong>Latest Action: </strong>{moment(bill.latest_major_action_date).format('LL')}: {bill.latest_major_action}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Introduced: </strong>{moment(bill.introduced_date).format('LL')}</p>
              <p><strong>Passage: </strong>Sen: {bill.senate_passage ? moment(bill.senate_passage).format('LL') : 'No Data'} HoR: {bill.house_passage ? moment(bill.house_passage).format('LL') : 'No Data'}</p>
            </div>
          </div>
          <div className="panel-footer">
            <Ballot
              bill={bill}
              votes={this.props.votes}
              updateVotes={this.props.updateVotes}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Bill;
