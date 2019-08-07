const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const firestore = admin.firestore();

// exports.setDefaultAvatar = functions.auth.user().onCreate((user) => {
//   const avatar = user.photoURL;
//
//   if (avatar) {
//     return null;
//   }
//
//   const uid = user.uid;
//
//   return admin.auth().updateUser(uid, {
//     photoURL: `https://api.adorable.io/avatars/285/${uid}.png`
//   });
// });

exports.deleteAccount = functions.auth.user().onDelete((user) => {
  const uid = user.uid;

  if (!uid) {
    return null;
  }

  return firestore.collection('users').doc(uid).delete();
});
