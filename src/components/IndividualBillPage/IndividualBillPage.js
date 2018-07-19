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
        this.setState({bill});
        this.updateVotes();
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
    return (
      <div className="IndividualBillPage container-fluid">
        <BillInfo bill={this.state.bill} votes={this.state.votes} updateVotes={this.updateVotes}/>
      </div>
    );
  }
};

export default IndividualBillPage;
