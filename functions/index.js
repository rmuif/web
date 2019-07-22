const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const firestore = admin.firestore();

exports.deleteAccount = functions.auth.user().onDelete((user) => {
  const uid = user.uid;

  if (!uid) {
    return null;
  }

  return firestore.collection('users').doc(uid).delete();
});
