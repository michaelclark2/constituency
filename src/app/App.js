import React from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';

import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import BillsPage from '../components/BillsPage/BillsPage';
import VotesPage from '../components/VotesPage/VotesPage';
import RepPage from '../components/RepPage/RepPage';
import IndividualBillPage from '../components/IndividualBillPage/IndividualBillPage';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

import connection from '../firebase/connection';
connection();

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/login', state: {from: props.location}}}
          />
        )

      }
    />
  );
};
const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/bills', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  state = {
    authed: false,
  }
  componentDidMount () {
    this.checkLogin = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({authed: true});
      }
      else {
        this.setState({authed: false});
      }
    });
  }
  componentWillUnmount () {
    this.checkLogin();
  }
  signOff = () => {
    this.setState({authed: false});
  }
  render () {
    return (
      <div className="App clearfix">
        <BrowserRouter>
          <div>
            <Navbar authed={this.state.authed} signOff={this.signOff}/>
            <Switch>
              <Route path="/" exact component={Home} />
              <PublicRoute path="/login" authed={this.state.authed} component={Login} />
              <PublicRoute path="/register" authed={this.state.authed} component={Register} />
              <PrivateRoute path="/bills" authed={this.state.authed} component={BillsPage} />
              <PrivateRoute path="/votes" authed={this.state.authed} component={VotesPage} />
              <PrivateRoute path="/bill/:slug" authed={this.state.authed} component={IndividualBillPage} />
              <PrivateRoute path="/rep/:id" authed={this.state.authed} component={RepPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
