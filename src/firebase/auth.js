import firebase from 'firebase';

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};
const logout = () => {
  return firebase.auth().signOut();
};
const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};
const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default {logout, loginUser, registerUser, getUid};
