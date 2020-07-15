import camelCase from "camelcase";

import { createMuiTheme } from "@material-ui/core/styles";

import firebase, { analytics, auth, firestore } from "../firebase";

import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey as gray,
  blueGrey as blueGray,
} from "@material-ui/core/colors";

const colors = {
  red: {
    id: "red",
    name: "Red",
    import: red,
  },

  pink: {
    id: "pink",
    name: "Pink",
    import: pink,
  },

  purple: {
    id: "purple",
    name: "Purple",
    import: purple,
  },

  deepPurple: {
    id: "deep-purple",
    name: "Deep Purple",
    import: deepPurple,
  },

  indigo: {
    id: "indigo",
    name: "Indigo",
    import: indigo,
  },

  blue: {
    id: "blue",
    name: "Blue",
    import: blue,
  },

  lightBlue: {
    id: "light-blue",
    name: "Light Blue",
    import: lightBlue,
  },

  cyan: {
    id: "cyan",
    name: "Cyan",
    import: cyan,
  },

  teal: {
    id: "teal",
    name: "Teal",
    import: teal,
  },

  green: {
    id: "green",
    name: "Green",
    import: green,
  },

  lightGreen: {
    id: "light-green",
    name: "Light Green",
    import: lightGreen,
  },

  lime: {
    id: "lime",
    name: "Lime",
    import: lime,
  },

  yellow: {
    id: "yellow",
    name: "Yellow",
    import: yellow,
  },

  amber: {
    id: "amber",
    name: "Amber",
    import: amber,
  },

  orange: {
    id: "orange",
    name: "Orange",
    import: orange,
  },

  deepOrange: {
    id: "deep-orange",
    name: "Deep Orange",
    import: deepOrange,
  },

  brown: {
    id: "brown",
    name: "Brown",
    import: brown,
  },

  gray: {
    id: "gray",
    name: "Gray",
    import: gray,
  },

  blueGray: {
    id: "blue-gray",
    name: "Blue Gray",
    import: blueGray,
  },
};

const getColor = (colorId) => {
  if (!colorId) {
    return null;
  }

  colorId = camelCase(colorId);

  return colors[colorId];
};

const defaultPrimaryColor = getColor(process.env.REACT_APP_THEME_PRIMARY_COLOR);
const defaultSecondaryColor = getColor(
  process.env.REACT_APP_THEME_SECONDARY_COLOR
);
const defaultDark = process.env.REACT_APP_THEME_DARK === "true";

const defaultTheme = createMuiTheme({
  palette: {
    primary: defaultPrimaryColor.import,
    secondary: defaultSecondaryColor.import,
    type: defaultDark ? "dark" : "light",
  },

  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
  dark: defaultDark,
});

const appearance = {};

appearance.colors = colors;

appearance.defaultPrimaryColor = defaultPrimaryColor;
appearance.defaultSecondaryColor = defaultSecondaryColor;
appearance.defaultDark = defaultDark;

appearance.defaultTheme = defaultTheme;

appearance.isDefaultTheme = (theme) => {
  if (!theme) {
    return false;
  }

  if (
    theme.primaryColor.id === defaultPrimaryColor.id &&
    theme.secondaryColor.id === defaultSecondaryColor.id &&
    theme.dark === defaultDark
  ) {
    return true;
  }

  return false;
};

appearance.createTheme = (theme) => {
  if (!theme) {
    return null;
  }

  let primaryColor = theme.primaryColor;
  let secondaryColor = theme.secondaryColor;
  let dark = theme.dark;

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  primaryColor = getColor(primaryColor);
  secondaryColor = getColor(secondaryColor);

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  theme = createMuiTheme({
    palette: {
      primary: primaryColor.import,
      secondary: secondaryColor.import,
      type: dark ? "dark" : "light",
    },

    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    dark: dark,
  });

  return theme;
};

appearance.changeTheme = (theme) => {
  return new Promise((resolve, reject) => {
    if (!theme) {
      reject(new Error("No theme"));

      return;
    }

    let primaryColor = theme.primaryColor;
    let secondaryColor = theme.secondaryColor;
    let dark = theme.dark;

    if (!primaryColor || !secondaryColor) {
      reject(new Error("No primary color or secondary color"));

      return;
    }

    primaryColor = getColor(primaryColor);
    secondaryColor = getColor(secondaryColor);

    if (!primaryColor || !secondaryColor) {
      reject(new Error("No primary color or secondary color"));

      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No UID"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        theme: {
          primaryColor: primaryColor.id,
          secondaryColor: secondaryColor.id,
          dark: dark,
        },
      })
      .then((value) => {
        analytics.logEvent("change_theme", {
          theme: theme,
        });

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

appearance.changePrimaryColor = (primaryColor) => {
  return new Promise((resolve, reject) => {
    if (!primaryColor) {
      reject(new Error("No primary color"));

      return;
    }

    primaryColor = getColor(primaryColor);

    if (!primaryColor) {
      reject(new Error("No primary color"));

      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No current user"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        "theme.primaryColor": primaryColor.id,
      })
      .then((value) => {
        analytics.logEvent("change_primary_color", {
          primaryColor: primaryColor.id,
        });

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

appearance.changeSecondaryColor = (secondaryColor) => {
  return new Promise((resolve, reject) => {
    if (!secondaryColor) {
      reject(new Error("No secondary color"));

      return;
    }

    secondaryColor = getColor(secondaryColor);

    if (!secondaryColor) {
      reject(new Error("No secondary color"));

      return;
    }

    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No UID"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        "theme.secondaryColor": secondaryColor.id,
      })
      .then((value) => {
        analytics.logEvent("change_secondary_color", {
          secondaryColor: secondaryColor.id,
        });

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

appearance.changeDark = (dark) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No UID"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        "theme.dark": dark,
      })
      .then((value) => {
        analytics.logEvent("change_dark", {
          dark: dark,
        });

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

appearance.changeSyncAppearance = (syncAppearance) => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No UID"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        "theme.syncAppearance": syncAppearance,
      })
      .then((value) => {
        analytics.logEvent("change_sync_appearance", {
          syncAppearance: syncAppearance,
        });

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

appearance.resetTheme = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject(new Error("No current user"));

      return;
    }

    const uid = currentUser.uid;

    if (!uid) {
      reject(new Error("No UID"));

      return;
    }

    const userDocumentReference = firestore.collection("users").doc(uid);

    userDocumentReference
      .update({
        theme: firebase.firestore.FieldValue.delete(),
      })
      .then((value) => {
        analytics.logEvent("reset_theme");

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

export default appearance;
