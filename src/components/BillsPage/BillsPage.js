import React from 'react';
import NavLink from '../NavLink/NavLink';
import './BillsPage.css';

class BillsPage extends React.Component {
  state = {
    bills: ['bill', 'bill two','bill three'],
    billChamber: 'both',
    billType: 'introduced',
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
    const billsComponents = this.state.bills.map(bill => {
      return (
        <div>
          <h1>{bill}</h1>
        </div>
      );
    });
    const disableBoth = () => {
      if (this.state.billType === 'upcoming') {
        return true;
      }
      return false;
    };
    return (
      <div className="BillsPage container-fluid">
        <div className="row search-bar">
          <div className="col-sm-6 col-sm-offset-3">
            <input type="text" className="form-control text-center" placeholder="Search..."/>
          </div>
        </div>
        <div className="col-xs-12 main">
          <ul className="nav nav-tabs nav-justified">
            <NavLink id='introduced' onClick={this.changeType} to='/bills/introduced'>Introduced</NavLink>
            <NavLink id='active' onClick={this.changeType} to='/bills/active'>Active</NavLink>
            <NavLink id='passed' onClick={this.changeType} to='/bills/passed'>Passed</NavLink>
            <NavLink id='enacted' onClick={this.changeType} to='/bills/enacted'>Enacted</NavLink>
            <NavLink id='upcoming' onClick={this.changeType} to='/bills/upcoming'>Upcoming</NavLink>
          </ul>
          <div className="form-group text-center chambers">
            <label className="radio-inline">
              <input
                onChange={this.changeChamber}
                type="radio"
                name="chamberSelect"
                value="both"
                disabled={disableBoth()}
                checked={this.state.billChamber === 'both' && this.state.billType !== 'upcoming'}/>
                  Both
            </label>
            <label className="radio-inline">
              <input
                onChange={this.changeChamber}
                type="radio"
                name="chamberSelect"
                value="senate"
                checked={this.state.billChamber === 'senate' || this.state.billType === 'upcoming'}
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
            {billsComponents}
          </div>
        </div>
      </div>
    );
  }
};

export default BillsPage;
