import axios from 'axios';
import constants from '../constants';

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

        if (res.data.divisions[ocddistrict].alsoKnownAs) {
          district = 1;
        } else {
          district = Number(ocddistrict.split('cd:')[1]);
        }
        resolve({state, district});
      }).catch(err => {
        reject(err);
      });
  });
};

export default {postUser, getDistrictByAddress};
