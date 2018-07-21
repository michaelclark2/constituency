import React from 'react';
import './MessageBoard.css';
import CommentInput from '../CommentInput/CommentInput';

import msgReqs from '../../firebase/messages';
import Comment from '../Comment/Comment';

class MessageBoard extends React.Component {
  state = {
    messages: [],
  }
  componentDidUpdate (props) {
    if (this.props.bill.bill_slug !== props.bill.bill_slug) {
      this.getAllMessages();
    }
  }
  getAllMessages = () => {
    const {bill} = this.props;
    msgReqs
      .getMessages(bill.bill_slug)
      .then(messages => {
        this.setState({messages});
      })
      .catch(err => {
        console.error('Error getting user info', err);
      });
  }
  render () {
    const comments = this.state.messages.map(comment => {
      return (
        <Comment key={comment.id} comment={comment} getMsgs={this.getAllMessages} />
      );
    });
    return (
      <div className="MessageBoard">
        <CommentInput user={this.props.user} bill={this.props.bill} votes={this.props.votes} getMsgs={this.getAllMessages}/>
        {comments}
      </div>
    );
  }
};

export default MessageBoard;
