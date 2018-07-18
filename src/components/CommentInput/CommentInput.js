import React from 'react';
import './CommentInput.css';

import msgReqs from '../../firebase/messages';

class CommentInput extends React.Component {
  state = {
    comment: '',
  }
  commentChange = (e) => {
    const comment = e.target.value;
    this.setState({comment});
  }
  sendComment = (e) => {
    e.preventDefault();
    const {comment} = this.state;
    const {user} = this.props;
    const uid = user.uid;
    const userVote = this.props.votes.find(x => x.uid === uid);
    const position = typeof userVote !== 'undefined' ? userVote.position : 'none';
    const commentToSend = {
      post: comment,
      billSlug: this.props.bill.bill_slug,
      uid,
      position,
      ...user,
    };
    msgReqs
      .postMessage(commentToSend)
      .then(res => {
        this.setState({comment: ''});
      })
      .catch(err => {
        console.error('Error sending comment', err);
      });
  }
  render () {
    return (
      <div className="CommentInput">
        <div className="thumbnail">
          <form className="caption">
            <textarea onChange={this.commentChange} className="form-control" rows="5" type="text" value={this.state.comment}></textarea>
            <button onClick={this.sendComment} type="submit" className="form-control btn btn-default">Send</button>
          </form>
        </div>
      </div>
    );
  }
};

export default CommentInput;
