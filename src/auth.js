import { auth, firestore } from './firebase';

export let isPerformingAuthAction = false;

export function changeFirstName(firstName, callback) {
  if (!firstName) {
    return;
  }

  isPerformingAuthAction = true;

  if (callback && typeof callback === 'function') {
    callback();
  }
}

export function changeLastName(lastName, callback) {
  if (!lastName) {
    return;
  }

  if (callback && typeof callback === 'function') {
    callback();
  }
}

export function changeUsername(username, callback) {
  if (!username) {
    return;
  }

  if (callback && typeof callback === 'function') {
    callback();
  }
}

export function changeEmailAddress(username, callback) {
  if (!username) {
    return;
  }

  if (callback && typeof callback === 'function') {
    callback();
  }
}