import _ from 'lodash';

import { createMuiTheme } from '@material-ui/core/styles';

import settings from './settings';
import colors from './colors';
import { auth, firestore } from './firebase';

const theme = {};

theme.defaultTheme = createMuiTheme({
  palette: {
    primary: colors[_.camelCase(settings.theme.primaryColor)].import,
    secondary: colors[_.camelCase(settings.theme.secondaryColor)].import,
    type: settings.theme.dark ? 'dark' : 'light'
  }
});

theme.currentTheme = theme.defaultTheme;

theme.changeTheme = (newTheme) => {
  if (!newTheme) {
    return;
  }

  const primaryColor = newTheme.primaryColor;
  const secondaryColor = newTheme.secondaryColor;
  const dark = newTheme.dark;

  theme.currentTheme = createMuiTheme({
    palette: {
      primary: colors[_.camelCase(primaryColor)].import,
      secondary: colors[_.camelCase(secondaryColor)].import,
      type: dark ? 'dark' : 'light'
    }
  });
};

theme.resetTheme = () => {
  theme.currentTheme = theme.defaultTheme;
};

theme.changePrimaryColor = (newPrimaryColor) => {
  return new Promise((resolve, reject) => {
    if (!newPrimaryColor) {
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
      theme: {
        primaryColor: newPrimaryColor
      }
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

theme.changeSecondaryColor = (newSecondaryColor) => {
  return new Promise((resolve, reject) => {
    if (!newSecondaryColor) {
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
      theme: {
        secondaryColor: newSecondaryColor
      }
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

theme.changeDark = (newDark) => {
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

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference.update({
      theme: {
        dark: newDark
      }
    }).then((value) => {
      resolve(value);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export default theme;