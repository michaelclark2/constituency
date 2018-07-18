import axios from 'axios';
import constants from '../constants';

const getBills = (billChamber, billType) => {
  let url = '';
  if (billType !== 'upcoming') {
    url = `https://api.propublica.org/congress/v1/115/${billChamber}/bills/${billType}.json`;
  } else {
    url = `https://api.propublica.org/congress/v1/bills/upcoming/${billChamber}.json`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: constants.propublicaApiKey,
      })
      .then(res => {
        resolve(res.data.results[0].bills);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const searchBills = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.propublica.org/congress/v1/bills/search.json?query=${query}`, {
        headers: constants.propublicaApiKey,
      })
      .then(res => {
        resolve(res.data.results[0].bills);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getIndividualBill = (uri) => {
  return new Promise((resolve, reject) => {
    axios
      .get(uri, {
        headers: constants.propublicaApiKey,
      })
      .then(res => {
        resolve(res.data.results[0]);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {getIndividualBill, getBills, searchBills};
