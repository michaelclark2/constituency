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
const getVotes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/votes.json`)
      .then(res => {
        const data = res.data;
        const allVotes = [];
        if (res.data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            allVotes.push(data[key]);
          });
        }
        resolve(allVotes);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getVotesBySlug = (slug) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/votes.json?orderBy="billSlug"&equalTo="${slug}"`)
      .then(res => {
        const data = res.data;
        const allVotes = [];
        if (data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            allVotes.push(data[key]);
          });
        }
        resolve(allVotes);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const updateVote = (voteObj) => {
  voteObj.position = !voteObj.position;
  const id = voteObj.id;
  delete voteObj.id;
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/votes/${id}.json`, voteObj)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getVoteData = (uri) => {
  return new Promise((resolve, reject) => {
    axios
      .get(uri, {
        headers: constants.propublicaApiKey,
      })
      .then(res => {
        resolve(res.data.results.votes.vote);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {castVote, getVotes, getVoteData, getVotesBySlug, updateVote};
