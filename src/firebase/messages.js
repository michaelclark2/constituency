import axios from 'axios';
import moment from 'moment';
import constants from '../constants';

const getMessages = (billSlug) => {
  return new Promise((resolve,reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/messages.json?orderBy="billSlug"&equalTo="${billSlug}"`)
      .then(res => {
        const data = res.data;
        const allMessages = [];
        if (data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            allMessages.push(data[key]);
          });
        }
        // Sort messages by date
        allMessages.sort((a, b) => {
          a = moment(a.date);
          b = moment(b.date);
          if (a.isBefore(b)) {
            return 1;
          } else if (b.isBefore(a)) {
            return -1;
          } else {
            return 0;
          }
        });
        resolve(allMessages);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const postMessage = (msg, voteObj) => {
  return new Promise((resolve, reject) => {
    // Get totals object first
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${msg.billSlug}"`)
      .then(res => {
        // If there is an object that comes back from data
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          // Increment comment total
          incrementMsgTotal(voteObj, uniqueVoteId);
        } else if (Object.keys(res.data).length === 0) {
          // If no object found in database, create new one
          newMsgTotal(voteObj);
        }

        // Post the message to the messages collection
        axios
          .post(`${constants.firebaseConfig.databaseURL}/messages.json`, msg)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error adding comment total', err);
      });
  });
};
const deleteComment = (msgId, bill) => {
  return new Promise((resolve, reject) => {
    // Get totals object from database first
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${bill.bill_slug}"`)
      .then(res => {
        // If an object is found, decrement the total comments, then update.
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          decrementMsgTotal(voteObj, uniqueVoteId);
        }

        // Delete from messages collection
        axios
          .delete(`${constants.firebaseConfig.databaseURL}/messages/${msgId}.json`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error decrementing comment total');
      });
  });
};

// /////////////////////////////
//
// Totals collection manipulation
//
// /////////////////////////////

const incrementMsgTotal = (msgObj, msgId) => {
  const vote = {...msgObj};
  vote.comments++;
  if (!vote.comments) {
    vote.comments = 1;
  }
  axios
    .put(`${constants.firebaseConfig.databaseURL}/totals/${msgId}.json`, vote)
    .then()
    .catch(err => {
      console.error('Error adding new comment total', err);
    });
};
const decrementMsgTotal = (msgObj, msgId) => {
  const msg = {...msgObj};
  msg.comments--;
  if (msg.comments >= 0) {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/totals/${msgId}.json`, msg)
      .then()
      .catch(err => {
        console.error('Error adding new comment total', err);
      });
  } else if (msg.comments === 0 && !msg.total) {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/totals/${msgId}.json`)
      .then()
      .catch(err => {
        console.error('Error deleting comment total', err);
      });
  }
};
const newMsgTotal = (voteObj) => {
  const msg = {...voteObj};
  delete msg.position;
  delete msg.uid;
  msg.comments = 1;
  axios
    .post(`${constants.firebaseConfig.databaseURL}/totals.json`, msg)
    .then()
    .catch(err => {
      console.error('Error adding new comment total', err);
    });
};

export default {postMessage, getMessages, deleteComment};
