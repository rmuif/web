import { auth, firestore } from './firebase';

export function changeFirstName(firstName) {
  if (!firstName) {
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  const uid = currentUser.uid;

  if (!uid) {
    return;
  }

  return new Promise((resolve, reject) => {
    firestore.collection('users').doc(uid).update({
      firstName: firstName
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeLastName(lastName) {
  if (!lastName) {
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  const uid = currentUser.uid;

  if (!uid) {
    return;
  }

  return new Promise((resolve, reject) => {
    firestore.collection('users').doc(uid).update({
      lastName: lastName
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeUsername(username) {
  if (!username) {
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  const uid = currentUser.uid;

  if (!uid) {
    return;
  }

  return new Promise((resolve, reject) => {
    firestore.collection('users').doc(uid).update({
      username: username
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
}

export function changeEmailAddress(emailAddress) {
  if (!emailAddress) {
    return;
  }

  const currentUser = auth.currentUser;

  if (!currentUser) {
    return;
  }

  const uid = currentUser.uid;

  if (!uid) {
    return;
  }

  return new Promise((resolve, reject) => {
    currentUser.updateEmail(emailAddress).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
}