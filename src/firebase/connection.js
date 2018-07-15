import firebase from 'firebase';
import constants from '../constants';

const connection = () => {
  firebase.initializeApp(constants.firebaseConfig);
};

export default connection;
