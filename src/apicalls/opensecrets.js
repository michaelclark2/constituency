import axios from 'axios';
import constants from '../constants';

const getOpenSecretsId = (cid) => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://theunitedstates.io/congress-legislators/legislators-current.json')
      .then(res => {
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

export default {getIndustry};
