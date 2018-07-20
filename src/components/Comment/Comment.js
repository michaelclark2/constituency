import React from 'react';
import moment from 'moment';
import './Comment.css';
import authReqs from '../../firebase/auth';
import msgReqs from '../../firebase/messages';

class Comment extends React.Component {
  render () {
    const {comment, getMsgs} = this.props;
    const removeComment = (e) => {
      msgReqs
        .deleteComment(comment.id)
        .then(res => {
          getMsgs();
        })
        .catch(err => {
          console.error('Error deleting message', err);
        });
    };
    return (
      <div className="Comment">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="media">
              <div className="media-left">
                <h5>{comment.username}</h5>
                <h6>{moment(comment.date).format('LL')}</h6>
                <h6>{
                  comment.position !== 'none' ? (
                    comment.position ? (
                      'Voted: For'
                    ) : (
                      'Voted Against'
                    )
                  ) : (
                    'Has not voted'
                  )
                }</h6>
                {
                  comment.uid === authReqs.getUid() ? (
                    <button className="btn btn-sm btn-default" onClick={removeComment}>Remove</button>
                  ) : (
                    ''
                  )
                }
              </div>
              <div className="media-body text-left">
                <p>
                  {
                    comment.post.split('\n').map((post, key) => {
                      return <span key={key}>{post}<br/></span>;
                    })
                  }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Comment;
