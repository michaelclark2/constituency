import React from 'react';
import moment from 'moment';
import './Comment.css';
import authReqs from '../../firebase/auth';

class Comment extends React.Component {
  render () {
    const {comment} = this.props;
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
                    <button className="btn btn-default">Remove</button>
                  ) : (
                    ''
                  )
                }
              </div>
              <div className="media-body text-left">
                <p>{comment.post}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Comment;
