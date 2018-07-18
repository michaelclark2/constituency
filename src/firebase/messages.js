import axios from 'axios';
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

export default {postMessage, getMessages};
