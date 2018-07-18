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
const postMessage = (msg) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/messages.json`, msg)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const deleteComment = (msgId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/messages/${msgId}.json`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {postMessage, getMessages, deleteComment};
