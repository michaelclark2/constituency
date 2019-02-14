import React from 'react';
import NavLink from '../NavLink/NavLink';
import Bill from '../Bill/Bill';
import './BillsPage.scss';

import {getBills, searchBills} from '../../apicalls/propublica';
import {getVotes} from '../../firebase/votes';

class BillsPage extends React.Component {
  state = {
    bills: [],
    votes: [],
    billChamber: '',
    billType: '',
    offset: 0,
    searchQuery: '',
  }
  loadOnScroll = (e) => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) &&
      this.state.bills.length &&
      this.state.billType !== 'upcoming'
    ) {
      this.setState({offset: this.state.offset + 1}, this.appendBills);
    }
  }
  componentDidMount () {
    this.updateVotes();
    window.addEventListener('scroll', this.loadOnScroll);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.loadOnScroll);
  }
  componentDidUpdate (prevProps, prevState) {
    const {billChamber, billType} = this.state;
    if (billType !== prevState.billType || billChamber !== prevState.billChamber) {
      if (billType && billChamber) {
        getBills(billChamber, billType)
          .then(bills => {
            this.setState({bills});
            console.log(bills)
          });
      }
    }
  }
  updateVotes = () => {
    getVotes()
      .then(votes => {
        this.setState({votes});
      })
      .catch(err => {
        console.error('Error getting votes', err);
      });
  }
  appendBills = () => {
    const {billChamber, billType, offset} = this.state;
    getBills(billChamber, billType, offset)
      .then(bills => {
        this.setState({bills: [...this.state.bills, ...bills]});
      });
  }
  searchBills = (e) => {
    if (e.key === 'Enter') {
      searchBills(this.state.searchQuery)
        .then(bills => {
          this.setState({bills});
        })
        .catch(err => {
          console.error('Error searching for bills', err);
        });
    }
  }
  searchInput = (e) => {
    this.setState({searchQuery: e.target.value});
  }
  changeChamber = (e) => {
    this.setState({billChamber: e.target.value});
  }
  changeType = (e) => {
    const billType = e.target.id;
    if (billType === 'upcoming') {
      this.setState({billType, billChamber: 'senate'});
    } else {
      this.setState({billType, billChamber: 'both'});
    }
  }
  render () {
    const {bills, billType} = this.state;
    const billsComponents = bills.length ? bills.map(bill => {
      return (
        <Bill
          key={bill.bill_id}
          bill={bill}
          votes={this.state.votes}
          updateVotes={this.updateVotes}
        />
      );

      }) : [<h1 className="text-center">No bills found...</h1>];
    return (
      <div className="BillsPage container-fluid">
        <div className="row search-bar">
          <div className="col-sm-6 col-sm-offset-3">
            <input
              onKeyPress={this.searchBills}
              onChange={this.searchInput}
              value={this.state.searchQuery}
              type="text"
              className="form-control text-center"
              placeholder="Search..."
            />
          </div>
        </div>
        <ul className="nav nav-tabs nav-justified">
          <NavLink
            id='introduced'
            onClick={this.changeType}
            to='/bills/introduced'>
            Introduced
          </NavLink>

          <NavLink
            id='active'
            onClick={this.changeType}
            to='/bills/active'>
            Active
          </NavLink>

          <NavLink
            id='passed'
            onClick={this.changeType}
            to='/bills/passed'>
            Passed
          </NavLink>

          <NavLink
            id='enacted'
            onClick={this.changeType}
            to='/bills/enacted'>
            Enacted
          </NavLink>

          <NavLink
            id='upcoming'
            onClick={this.changeType}
            to='/bills/upcoming'>
            Upcoming
          </NavLink>
        </ul>
        <div className="col-xs-12 main">
          <div className="form-group text-center chambers">
            <label className="radio-inline">
              <input
                onChange={this.changeChamber}
                type="radio"
                name="chamberSelect"
                value="both"
                disabled={this.state.billType === 'upcoming'}
                checked={this.state.billChamber === 'both' && this.state.billType !== 'upcoming'}
              /> Both
            </label>
            <label className="radio-inline">
              <input
                onChange={this.changeChamber}
                type="radio"
                name="chamberSelect"
                value="senate"
                checked={this.state.billChamber === 'senate'}
              /> Senate
            </label>
            <label className="radio-inline">
              <input
                onChange={this.changeChamber}
                type="radio"
                name="chamberSelect"
                value="house"
                checked={this.state.billChamber === 'house'}
              /> House
            </label>
          </div>
          <div className="col-xs-12 bills-container">
            {
              billsComponents.length && billType  ? (
                billsComponents
              ) : (
                <h1 className="text-center">Please choose a type of bill.</h1>
              )
            }
          </div>
        </div>
      </div>
    );
  }
};

export default BillsPage;
