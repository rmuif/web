import { auth, firestore, storage } from './firebase';

export const changeAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    if (!avatar) {
      reject();
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();
    }

    const reference = storage.ref().child('images').child('avatars').child(uid);

    reference.put(avatar).then((uploadTaskSnapshot) => {
      reference.getDownloadURL().then((value) => {
        currentUser.updateProfile({
          photoURL: value
        }).then((value) => {
          resolve(value);
        }).catch((reason) => {
          reject(reason);
        });
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const changeFirstName = (firstName) => {
  return new Promise((resolve, reject) => {
    if (!firstName) {
      reject();
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();
    }

    firestore.collection('users').doc(uid).update({
      firstName: firstName
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const changeLastName = (lastName) => {
  return new Promise((resolve, reject) => {
    if (!lastName) {
      reject();
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();
    }

    firestore.collection('users').doc(uid).update({
      lastName: lastName
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const changeUsername = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) {
      reject();
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();
    }

    firestore.collection('users').doc(uid).update({
      username: username
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const changeEmailAddress = (emailAddress) => {
  return new Promise((resolve, reject) => {
    if (!emailAddress) {
      reject();
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();
    }

    currentUser.updateEmail(emailAddress).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const verifyEmailAddress = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();
    }

    currentUser.sendEmailVerification().then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};