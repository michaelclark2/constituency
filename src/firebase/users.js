import axios from 'axios';
import constants from '../constants';

const getUserInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/users.json?orderBy="uid"&equalTo="${id}"`)
      .then(res => {
        const data = Object.values(res.data)[0];
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/users.json`)
      .then(res => {
        const data = res.data;
        const users = [];
        if (data !== null) {
          Object.keys(data).forEach(key => {
            data[key].id = key;
            users.push(data[key]);
          });
        }
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const postUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/users.json`, user)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getDistrictByAddress = (address) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.googleapis.com/civicinfo/v2/representatives/?address="${address}"&roles=legislatorlowerbody&includeOffices=false&key=${constants.googleCivicApiKey}`)
      .then(res => {
        const data = res.data;
        const state = data.normalizedInput.state;

        let district;
        const ocddistrict = Object.keys(data.divisions)[0];

        // If there is no district, then the district is 1
        if (res.data.divisions[ocddistrict].alsoKnownAs) {
          district = 1;
        } else {
          // Split the district number from the ocd string
          district = Number(ocddistrict.split('cd:')[1]);
        }
        // Resolves an object with state and district, to be added to user object in promise chain
        resolve({state, district});
      }).catch(err => {
        reject(err);
      });
  });
};

export default {getUsers, getUserInfo, postUser, getDistrictByAddress};
