import axios from 'axios';
import constants from '../constants';

const castVote = (voteObj) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${voteObj.billSlug}"`)
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          incrementVoteTotal(voteObj, uniqueVoteId);
        } else if (Object.keys(res.data).length === 0) {
          newVoteTotal(voteObj);
        }
        axios
          .post(`${constants.firebaseConfig.databaseURL}/votes.json`, voteObj)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error updating vote totals', err);
      });
  });
};
const incrementVoteTotal = (voteObj, voteId) => {
  const vote = {...voteObj};
  delete vote.position;
  delete vote.uid;
  vote.total++;
  axios
    .put(`${constants.firebaseConfig.databaseURL}/totals/${voteId}.json`, vote)
    .then()
    .catch(err => {
      console.error('Error adding new vote total', err);
    });
};
const decrementVoteTotal = (voteObj, voteId) => {
  const vote = {...voteObj};
  delete vote.position;
  delete vote.uid;
  vote.total--;
  if (vote.total) {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/totals/${voteId}.json`, vote)
      .then()
      .catch(err => {
        console.error('Error adding new vote total', err);
      });
  } else if (vote.total === 0) {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/totals/${voteId}.json`)
      .then()
      .catch(err => {
        console.error('Error deleting vote total', err);
      })
  }
};
const newVoteTotal = (voteObj) => {
  const vote = {...voteObj};
  delete vote.position;
  delete vote.uid;
  vote.total = 1;
  axios
    .post(`${constants.firebaseConfig.databaseURL}/totals.json`, vote)
    .then()
    .catch(err => {
      console.error('Error adding new vote total', err);
    });
};
const getPopularVotes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="total"`)
      .then(res => {
        const data = res.data;
        const popVotes = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(key => {
            data[key].id = key;
            popVotes.push(data[key]);
          });
        }
        resolve(popVotes);
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
const deleteVote = (id, voteObj) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="billSlug"&equalTo="${voteObj.billSlug}"`)
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          const uniqueVoteId = Object.keys(res.data)[0];
          const voteObj = res.data[uniqueVoteId];
          decrementVoteTotal(voteObj, uniqueVoteId);
        }
        axios
          .delete(`${constants.firebaseConfig.databaseURL}/votes/${id}.json`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        console.error('Error deleting vote', err);
      });
  });
};

export {castVote, getVotes, getVoteData, getVotesBySlug, updateVote, deleteVote, getPopularVotes};
