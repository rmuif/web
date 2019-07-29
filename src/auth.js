import firebase, { auth, firestore, storage } from './firebase';

const avatarFileTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml'
];

export const signUp = (fields) => {
  return new Promise((resolve, reject) => {
    if (!fields) {
      reject();

      return;
    }

    const firstName = fields.firstName;
    const lastName = fields.lastName;
    const username = fields.username;
    const emailAddress = fields.emailAddress;
    const password = fields.password;

    if (!firstName || !lastName || !username || !emailAddress || !password) {
      reject();

      return;
    }

    const currentUser = auth.currentUser;

    if (currentUser) {
      reject();

      return;
    }

    auth.createUserWithEmailAndPassword(emailAddress, password).then((value) => {
      const user = value.user;

      if (!user) {
        reject();

        return;
      }

      const uid = user.uid;

      if (!uid) {
        reject();

        return;
      }

      const reference = firestore.collection('users').doc(uid);

      if (!reference) {
        reject();

        return;
      }

      reference.set({
        firstName: firstName,
        lastName: lastName,
        username: username
      }).then((value) => {
        resolve(value);
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const signIn = (emailAddress, password) => {
  return new Promise((resolve, reject) => {
    if (!emailAddress || !password) {
      reject();

      return;
    }

    const currentUser = auth.currentUser;

    if (currentUser) {
      reject();

      return;
    }

    auth.signInWithEmailAndPassword(emailAddress, password).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const signInWithAuthProvider = (providerId) => {
  return new Promise((resolve, reject) => {
    if (!providerId) {
      reject();

      return;
    }

    const provider = new firebase.auth.OAuthProvider(providerId);

    if (!provider) {
      reject();

      return;
    }

    const currentUser = auth.currentUser;

    if (currentUser) {
      reject();

      return;
    }

    auth.signInWithPopup(provider).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    auth.signOut().then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const resetPassword = (emailAddress) => {
  return new Promise((resolve, reject) => {
    if (!emailAddress) {
      reject();

      return;
    }

    const currentUser = auth.currentUser;

    if (currentUser) {
      reject();

      return;
    }

    auth.sendPasswordResetEmail(emailAddress).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const changeAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    if (!avatar) {
      reject();

      return;
    }

    if (!avatarFileTypes.includes(avatar.type)) {
      reject();

      return;
    }

    if (avatar.size > (20 * 1024 * 1024)) {
      reject();

      return;
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();

      return;
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();

      return;
    }

    const reference = storage.ref().child('images').child('avatars').child(uid);

    if (!reference) {
      reject();

      return;
    }

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

export const removeAvatar = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject();

      return;
    }

    currentUser.updateProfile({
      photoURL: null
    }).then((value) => {
      const reference = storage.ref().child('images').child('avatars').child(uid);

      if (!reference) {
        reject();

        return;
      }

      reference.delete().then((value) => {
        resolve(value);
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

      return;
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();

      return;
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();

      return;
    }

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference.update({
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

      return;
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();
      
      return;
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();

      return;
    }

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference.update({
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

      return;
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();

      return;
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();

      return;
    }

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference.update({
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

      return;
    }
  
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      reject();

      return;
    }
  
    const uid = currentUser.uid;
  
    if (!uid) {
      reject();

      return;
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

      return;
    }

    currentUser.sendEmailVerification().then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const deleteAccount = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    currentUser.delete().then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};