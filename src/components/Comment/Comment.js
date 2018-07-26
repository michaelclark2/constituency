import React from 'react';
import moment from 'moment';
import './Comment.css';
import noPic from '../RepPage/img/notavailable.png';
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
        <div className={
          comment.isRep ? (
            'panel panel-info'
          ) : (
            'panel panel-default'
          )
        }>
          <div className="panel-body">
            {
              comment.isRep ? (
                <h2>Official Statement</h2>
              ) : (
                ''
              )
            }
            <div className="media">
              <div className="media-left">
                <img src={noPic} className="media-object" alt=""/>
                <h6>
                  {
                    comment.position !== 'none' ? (
                      comment.position ? (
                        'Voted: For'
                      ) : (
                        'Voted Against'
                      )
                    ) : (
                      'Has not voted'
                    )
                  }
                </h6>
                <h6>
                  {moment(comment.date).format('M/YY')}<br/>
                  {moment(comment.date).format('H:mm a')}
                </h6>

              </div>
              <div className="media-body text-left">
                <h4 className="media-heading">{comment.username}</h4>
                <hr/>
                <p>
                  {
                    comment.post.split('\n').map((post, key) => {
                      return <span key={key}>{post}<br/></span>;
                    })
                  }
                </p>
              </div>
              <div className="media-right">
                {
                  comment.uid === authReqs.getUid() ? (
                    <button
                      className="btn btn-sm btn-default pull-right"
                      onClick={removeComment}>
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                  ) : (
                    ''
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Comment;
