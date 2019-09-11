import { createMuiTheme } from '@material-ui/core/styles';

import { getColor } from './colors';

const primaryColor = getColor(process.env.REACT_APP_PRIMARY_COLOR);
const secondaryColor = getColor(process.env.REACT_APP_SECONDARY_COLOR);
const dark = process.env.REACT_APP_DARK === 'true';

const defaultTheme = createMuiTheme({
  palette: {
    primary: primaryColor.import,
    secondary: secondaryColor.import,
    type: dark ? 'dark' : 'light'
  },

  primaryColor: primaryColor,
  secondaryColor: secondaryColor,
  dark: dark
});

const theming = {};

theming.currentTheme = defaultTheme;

theming.defaultTheme = theming.currentTheme === defaultTheme;

theming.changeTheme = (theme) => {
  if (!theme) {
    return;
  }

  let primaryColor = theme.primaryColor;
  let secondaryColor = theme.secondaryColor;
  const dark = theme.dark;

  if (!primaryColor || !secondaryColor) {
    return;
  }

  primaryColor = getColor(primaryColor);
  secondaryColor = getColor(secondaryColor);

  theming.currentTheme = createMuiTheme({
    palette: {
      primary: primaryColor.import,
      secondary: secondaryColor.import,
      type: dark ? 'dark' : 'light'
    },

    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    dark: dark
  });
};

theming.resetTheme = () => {
  if (theming.currentTheme === defaultTheme) {
    return;
  }

  theming.currentTheme = defaultTheme;
};

export default theming;
