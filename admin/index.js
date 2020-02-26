const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://react-material-ui-firebase.firebaseio.com"
});

const auth = admin.auth();

setRoles = (uid, roles) => {
  return new Promise((resolve, reject) => {
    if (!uid || !roles) {
      reject();

      return;
    }

    resolve(auth.setCustomUserClaims(uid, { roles: roles }));
  });
};
