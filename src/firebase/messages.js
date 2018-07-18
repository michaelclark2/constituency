import axios from 'axios';
import constants from '../constants';

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

export default {postMessage};
