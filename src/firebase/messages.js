import axios from 'axios';
import moment from 'moment';
import constants from '../constants';

const incrementMsgTotal = (msgObj, msgId) => {
  const vote = {...msgObj};
  vote.comments++;
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
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${msg.billSlug}"`)
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          incrementMsgTotal(voteObj, uniqueVoteId);
        } else if (Object.keys(res.data).length === 0) {
          newMsgTotal(voteObj);
        }
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
      })
  });
};
const deleteComment = (msgId, bill) => {
  const billObj = {
    billSlug: bill.bill_slug,
    billNumber: bill.number || bill.bill_number,
    billTitle: bill.title || (bill.context || bill.description),
    billUri: bill.bill_uri || bill.api_uri,
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${billObj.billSlug}"`)
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          decrementMsgTotal(voteObj, uniqueVoteId);
        }
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

export default {postMessage, getMessages, deleteComment};
