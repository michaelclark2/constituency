import React from 'react';
import moment from 'moment';
import './CommentInput.scss';

import msgReqs from '../../firebase/messages';

class CommentInput extends React.Component {
  state = {
    comment: '',
    isError: false,
    isSuccess: false,
  }
  commentChange = (e) => {
    const comment = e.target.value;
    this.setState({comment});
  }
  sendComment = (e) => {
    e.preventDefault();
    const {comment} = this.state;
    const {user, bill} = this.props;
    const uid = user.uid;
    const userVote = this.props.votes.find(x => x.uid === uid) || {
      billSlug: bill.bill_slug,
      billNumber: bill.number || bill.bill_number,
      billTitle: bill.title || (bill.context || bill.description),
      billUri: bill.bill_uri || bill.api_uri,
    };
    const position = typeof userVote.position !== 'undefined' ? userVote.position : 'none';
    const commentToSend = {
      post: comment,
      billSlug: bill.bill_slug,
      position,
      ...user,
      date: moment(),
    };
    if (commentToSend.post) {
      msgReqs
        .postMessage(commentToSend, userVote)
        .then(res => {
          this.props.getMsgs();
          this.setState({comment: '', isSuccess: true, isError: false});
        })
        .catch(err => {
          console.error('Error sending comment', err);
        });
    } else {
      this.setState({isError: true, isSuccess: false, errorMsg: 'Please enter a comment'});
    }
  }
  render () {
    return (
      <div className="CommentInput">
        <div className="thumbnail">
          <form className="caption">
            {
              this.state.isError ? (
                <div className="alert alert-danger">
                  {this.state.errorMsg}
                </div>
              ) : (
                ''
              )
            }
            {
              this.state.isSuccess ? (
                <div className="alert alert-success">
                  Comment posted!
                </div>
              ) : (
                ''
              )
            }
            <textarea
              onChange={this.commentChange}
              className="form-control"
              rows="5"
              type="text"
              value={this.state.comment}>
            </textarea>
            <button
              onClick={this.sendComment}
              type="submit"
              className="form-control btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default CommentInput;
