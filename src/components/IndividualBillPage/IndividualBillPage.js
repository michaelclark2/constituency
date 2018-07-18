import React from 'react';
import './IndividualBillPage';

import {getIndividualBill} from '../../apicalls/propublica';
import {getVotesBySlug} from '../../firebase/votes';

import BillInfo from '../BillInfo/BillInfo';

class IndividualBillPage extends React.Component {
  state = {
    bill: {},
    votes: [],
  }
  componentDidMount () {
    getIndividualBill(this.props.location.uri)
      .then(bill => {
        getVotesBySlug(bill.bill_slug)
          .then(votes => {
            this.setState({bill, votes});
          })
          .catch(err => {
            console.error('Error getting votes by bill slug');
          });
      })
      .catch(err => {
        console.error('Error getting individual bill', err);
      });
  }
  render () {
    return (
      <div className="IndividualBillPage container-fluid">
        <BillInfo bill={this.state.bill} votes={this.state.votes}/>
      </div>
    );
  }
};

export default IndividualBillPage;
