import axios from 'axios';
import constants from '../constants';

const castVote = (voteObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/votes.json`, voteObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {castVote};
