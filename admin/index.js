const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://react-material-ui-firebase.firebaseio.com'
});

const auth = admin.auth();

/**
 * Deletes every user.
 * @param nextPageToken The next page token. If not specified, returns users starting without any offset.
 */
const deleteAllUsers = (nextPageToken) => {
  auth.listUsers(undefined, nextPageToken).then((listUserResult) => {
    listUserResult.users.forEach((userRecord) => {
      const uid = userRecord.uid;

      auth.deleteUser(uid).then(() => {
        console.log(`Deleted user ${uid}`);
      }).catch((reason) => {
        console.log(reason);
      });
    });

    const pageToken = listUserResult.pageToken;

    if (pageToken) {
      deleteAllUsers(pageToken);
    }
  }).catch((reason) => {
    console.log(reason);
  });
};
