import React from 'react';
import './MessageBoard.css';
import CommentInput from '../CommentInput/CommentInput';

import userReqs from '../../firebase/users';
import authReqs from '../../firebase/auth';

class MessageBoard extends React.Component {
  state = {
    user: {},
  }
  componentDidMount () {
    userReqs
      .getUserInfo(authReqs.getUid())
      .then(user => {
        this.setState({user});
      })
      .catch(err => {
        console.error('Error getting user info', err);
      });
  }
  render () {
    return (
      <div className="MessageBoard">
        <CommentInput user={this.state.user} bill={this.props.bill} votes={this.props.votes} />
        {/* messages here */}
      </div>
    );
  }
};

export default MessageBoard;
