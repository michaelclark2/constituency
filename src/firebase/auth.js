import firebase from 'firebase';

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};
const logout = () => {
  return firebase.auth().signOut();
};

export default {logout, loginUser};
