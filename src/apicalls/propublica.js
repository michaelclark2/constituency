import axios from 'axios';
import constants from '../constants';

const getBills = (billChamber, billType, offset = 0) => {
  let url = '';
  offset = offset * 20;
  if (billType === 'upcoming') {
    url = `https://api.propublica.org/congress/v1/bills/upcoming/${billChamber}.json`;
  } else {
    url = `https://api.propublica.org/congress/v1/116/${billChamber}/bills/${billType}.json?offset=${offset}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: constants.propublicaApiKey,
      })
      .then(res => {
        resolve(res.data.results[0].bills || []);
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
