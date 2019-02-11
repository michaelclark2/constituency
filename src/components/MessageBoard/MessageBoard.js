import React from 'react';
import './MessageBoard.scss';
import CommentInput from '../CommentInput/CommentInput';

import msgReqs from '../../firebase/messages';
import Comment from '../Comment/Comment';

class MessageBoard extends React.Component {
  state = {
    messages: [],
  }
  componentDidUpdate (props) {
    if (
      this.props.bill.bill_slug !== props.bill.bill_slug ||
      this.props.user !== props.user
    ) {
      this.getAllMessages();
    }
  }
  getAllMessages = () => {
    const {bill, user} = this.props;
    msgReqs
      .getMessages(bill.bill_slug)
      .then(messages => {
        messages = messages.map(msg => {
          // If the message isRep, and the rep is in your state and district return message, else return null
          if (
            msg.isRep &&
            msg.state === user.state &&
            (msg.district === user.district && msg.state === user.state)
          ) {
            return msg;
          } else if (!msg.isRep) {
            return msg;
          } else {
            return null;
          }
        })
          // Filter out the nulls
          .filter(msg => msg !== null)
          // Sort the reps comments to the top
          .sort((a, b) => {
            if (b.isRep) {
              return 1;
            }
            return 0;
          });
        this.setState({messages});
      })
      .catch(err => {
        console.error('Error getting user info', err);
      });
  }
  render () {
    const comments = this.state.messages.map(comment => {
      return (
        <Comment
          key={comment.id}
          comment={comment}
          bill={this.props.bill}
          getMsgs={this.getAllMessages}
          user={this.props.user}
        />
      );
    });
    return (
      <div className="MessageBoard">
        <CommentInput
          user={this.props.user}
          bill={this.props.bill}
          votes={this.props.votes}
          getMsgs={this.getAllMessages}
        />
        {comments}
      </div>
    );
  }
};

export default MessageBoard;
