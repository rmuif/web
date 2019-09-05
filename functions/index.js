const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const firestore = admin.firestore();
const storage = admin.storage();

exports.deleteAccount = functions.auth.user().onDelete((user) => {
  const uid = user.uid;

  if (!uid) {
    return null;
  }

  const deleteUser = firestore.collection('users').doc(uid).delete();
  const deleteAvatar = storage.bucket().deleteFiles({ prefix: `images/avatars/${uid}` });

  return Promise.all([ deleteUser, deleteAvatar ]);
});
