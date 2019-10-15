import firebase, { analytics, auth, firestore, storage } from '../firebase';

const avatarFileTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml'
];

const authentication = {};

authentication.signUp = (fields) => {
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
        analytics.logEvent('sign_up', {
          method: 'password'
        });

        resolve(value);
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.signIn = (emailAddress, password) => {
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
      analytics.logEvent('login', {
        method: 'password'
      });

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.signInWithAuthProvider = (providerId) => {
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
      analytics.logEvent('login', {
        method: providerId
      });

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.linkAuthProvider = (providerId) => {
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

    if (!currentUser) {
      reject();

      return;
    }

    currentUser.linkWithPopup(provider).then((value) => {
      analytics.logEvent('link_auth_provider', {
        value: providerId
      });

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.unlinkAuthProvider = (providerId) => {
  return new Promise((resolve, reject) => {
    if (!providerId) {
      reject();

      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    currentUser.unlink(providerId).then((value) => {
      analytics.logEvent('unlink_auth_provider', {
        value: providerId
      });

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.authProviderData = (providerId) => {
  if (!providerId) {
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  const providerData = currentUser.providerData;

  if (!providerData) {
    return;
  }

  return providerData.find(authProvider => authProvider.providerId === providerId);
};

authentication.signOut = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    auth.signOut().then((value) => {
      analytics.logEvent('sign_out');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.resetPassword = (emailAddress) => {
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
      analytics.logEvent('reset_password');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changeAvatar = (avatar) => {
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
          analytics.logEvent('change_avatar');

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

authentication.removeAvatar = () => {
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
        analytics.logEvent('remove_avatar');

        resolve(value);
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changeFirstName = (firstName) => {
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
      analytics.logEvent('change_first_name');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changeLastName = (lastName) => {
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
      analytics.logEvent('change_last_name');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changeUsername = (username) => {
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
      analytics.logEvent('change_username');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changeEmailAddress = (emailAddress) => {
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
      analytics.logEvent('change_email_address');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.changePassword = (password) => {
  return new Promise((resolve, reject) => {
    if (!password) {
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

    currentUser.updatePassword(password).then((value) => {
      const reference = firestore.collection('users').doc(uid);

      if (!reference) {
        reject();

        return;
      }

      reference.update({
        lastPasswordChange: firebase.firestore.FieldValue.serverTimestamp()
      }).then((value) => {
        analytics.logEvent('change_password');

        resolve(value);
      }).catch((reason) => {
        reject(reason);
      });
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.verifyEmailAddress = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    currentUser.sendEmailVerification().then((value) => {
      analytics.logEvent('verify_email_address');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

authentication.deleteAccount = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    currentUser.delete().then((value) => {
      analytics.logEvent('delete_account');

      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export default authentication;
