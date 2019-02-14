import axios from 'axios';
import constants from '../constants';

// Gets the CRP ids from the congress api
const getOpenSecretsId = (cid) => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://theunitedstates.io/congress-legislators/legislators-current.json')
      .then(res => {
        // find representative from current legislators
        const repInfo = res.data.find(rep => rep.id.bioguide === cid);
        resolve(repInfo);
      }).catch(err => {
        reject(err);
      });
  });
};
const getContrib = (cid) => {
  return new Promise((resolve, reject) => {
    getOpenSecretsId(cid)
      .then(rep => {
        axios
          .get(`https://constituency-app.herokuapp.com/api/opensecrets/?method=candContrib&cid=${rep.id.opensecrets}&apikey=${constants.openSecretsApiKey}&output=json`)
          .then(res => {
            // combine rep info
            resolve({...res.data.response, ...rep});
          })
          .catch(err => {
            reject(err);
          });
      });
  });
};
const getIndustry = (cid) => {
  return new Promise((resolve, reject) => {
    getContrib(cid)
      .then(rep => {
        axios
          .get(`https://constituency-app.herokuapp.com/api/opensecrets/?method=candIndustry&cid=${rep.id.opensecrets}&apikey=${constants.openSecretsApiKey}&output=json`)
          .then(res => {
            resolve({...res.data.response, ...rep});
          })
          .catch(err => {
            reject(err);
          });
      });
  });
};

const getContribInfo = (cid) => {
  // Combines all OpenSecrets api calls to resolve single rep info object
  return getIndustry(cid);
};

export default {getContribInfo};
