import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import validate from 'validate.js';

import firebase from 'firebase/app';
import 'firebase/auth';

import readingTime from 'reading-time';

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import gray from '@material-ui/core/colors/grey';
import blueGray from '@material-ui/core/colors/blueGrey';

import { createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import CodeIcon from '@material-ui/icons/Code';

import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

import LaunchScreen from './layout/LaunchScreen';

import Bar from './layout/Bar';
import EmptyState from './layout/EmptyState';

import HomeContent from './content/HomeContent';
import NotFoundContent from './content/NotFoundContent';

import SignUpDialog from './dialogs/SignUpDialog';
import SignInDialog from './dialogs/SignInDialog';
import ResetPasswordDialog from './dialogs/ResetPasswordDialog';
import SettingsDialog from './dialogs/SettingsDialog';
import InputDialog from './dialogs/InputDialog';
import ConfirmationDialog from './dialogs/ConfirmationDialog';

/**
 * Firebase
 */

const config = {
  apiKey: 'AIzaSyDYZOrZVpXkPQD6J31mb9t2eIIxmGEJK-Q',
  authDomain: 'react-material-ui-firebase.firebaseapp.com',
  databaseURL: 'https://react-material-ui-firebase.firebaseio.com',
  projectId: 'react-material-ui-firebase',
  storageBucket: 'react-material-ui-firebase.appspot.com',
  messagingSenderId: '552659850812'
};

firebase.initializeApp(config);

const auth = firebase.auth();

/**
 * Theming
 */

const colors = [
  {
    id: 'red',
    name: 'Red',
    import: red
  },
  {
    id: 'pink',
    name: 'Pink',
    import: pink
  },
  {
    id: 'purple',
    name: 'Purple',
    import: purple
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    import: deepPurple
  },
  {
    id: 'indigo',
    name: 'Indigo',
    import: indigo
  },
  {
    id: 'blue',
    name: 'Blue',
    import: blue
  },
  {
    id: 'light-blue',
    name: 'Light Blue',
    import: lightBlue
  },
  {
    id: 'cyan',
    name: 'Cyan',
    import: cyan
  },
  {
    id: 'teal',
    name: 'Teal',
    import: teal
  },
  {
    id: 'green',
    name: 'Green',
    import: green
  },
  {
    id: 'light-green',
    name: 'Light Green',
    import: lightGreen
  },
  {
    id: 'lime',
    name: 'Lime',
    import: lime
  },
  {
    id: 'yellow',
    name: 'Yellow',
    import: yellow
  },
  {
    id: 'amber',
    name: 'Amber',
    import: amber
  },
  {
    id: 'orange',
    name: 'Orange',
    import: orange
  },
  {
    id: 'deep-orange',
    name: 'Deep Orange',
    import: deepOrange
  },
  {
    id: 'brown',
    name: 'Brown',
    import: brown
  },
  {
    id: 'gray',
    name: 'Gray',
    import: gray
  },
  {
    id: 'blue-gray',
    name: 'Blue Gray',
    import: blueGray
  }
];

const types = [
  'light',
  'dark'
];

const defaultTheme = {
  primaryColor: 'blue',
  secondaryColor: 'red',
  type: 'light'
};

let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    type: 'light'
  },

  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  emptyStateIcon: {
    fontSize: `${theme.spacing.unit * 12}px`
  },

  button: {
    marginTop: `${theme.spacing.unit}px`
  },

  buttonIcon: {
    marginRight: `${theme.spacing.unit}px`
  }
});

/**
 * Settings
 */

const settings = {
  name: 'React + Material-UI + Firebase'
};

const constraints = {
  signUp: {
    emailAddress: {
      email: true,
      presence: {
        allowEmpty: false
      }
    },

    password: {
      length: {
        minimum: 6
      },
      presence: {
        allowEmpty: false
      }
    },

    passwordConfirmation: {
      equality: 'password',
      length: {
        minimum: 6
      },
      presence: {
        allowEmpty: false
      }
    }
  },

  signIn: {
    emailAddress: {
      email: true,
      presence: {
        allowEmpty: false
      }
    },

    password: {
      length: {
        minimum: 6
      },
      presence: {
        allowEmpty: false
      }
    }
  },

  resetPassword: {
    emailAddress: {
      email: true,
      presence: {
        allowEmpty: false
      }
    }
  },

  changeDisplayName: {
    displayName: {
      presence: {
        allowEmpty: false
      }
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryColor: defaultTheme.primaryColor,
      secondaryColor: defaultTheme.secondaryColor,
      type: defaultTheme.type,

      isAuthReady: false,
      isPerformingAuthAction: false,
      isSignedIn: false,

      user: null,
      displayName: '',

      signUpDialog: {
        open: false
      },

      signInDialog: {
        open: false
      },

      resetPasswordDialog: {
        open: false
      },

      settingsDialog: {
        open: false
      },

      changeDisplayNameDialog: {
        open: false,

        displayName: '',
        errors: null
      },

      signOutDialog: {
        open: false
      },

      snackbar: {
        autoHideDuration: 0,
        message: '',
        open: false
      }
    };
  }

  /**
   * Creates a new user account associated with the specified email address and password.
   * @param emailAddress
   * @param password
   * @param passwordConfirmation
   */
  signUp = (emailAddress, password, passwordConfirmation) => {
    if (this.state.isSignedIn) {
      return;
    }

    if (!emailAddress || !password || !passwordConfirmation) {
      return;
    }

    const errors = validate({
      emailAddress,
      password,
      passwordConfirmation
    }, constraints.signUp);

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.createUserWithEmailAndPassword(emailAddress, password).then((value) => {
        this.closeSignUpDialog(() => {
          this.openSnackbar(`Welcome to ${settings.name}`);
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
          case 'auth/operation-not-allowed':
          case 'auth/weak-password':
            this.openSnackbar(message);
            return;

          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Asynchronously signs in using an email and password.
   * @param emailAddress
   * @param password
   */
  signIn = (emailAddress, password) => {
    if (this.state.isSignedIn) {
      return;
    }

    if (!emailAddress || !password) {
      return;
    }

    const errors = validate({
      emailAddress,
      password,
    }, constraints.signIn);

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signInWithEmailAndPassword(emailAddress, password).then((value) => {
        this.closeSignInDialog(() => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.openSnackbar(`Signed in as ${displayName || emailAddress}`);
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.openSnackbar(message);
            return;

          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Authenticates a Firebase client using a popup-based OAuth authentication flow.
   * @param provider
   */
  signInWithProvider = (provider) => {
    if (this.state.isSignedIn) {
      return;
    }

    if (!provider) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signInWithPopup(provider).then((value) => {
        this.closeSignUpDialog(() => {
          this.closeSignInDialog(() => {
            const user = value.user;
            const displayName = user.displayName;
            const emailAddress = user.email;

            this.openSnackbar(`Signed in as ${displayName || emailAddress}`);
          });
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/account-exists-with-different-credential':
          case 'auth/auth-domain-config-required':
          case 'auth/cancelled-popup-request':
          case 'auth/operation-not-allowed':
          case 'auth/operation-not-supported-in-this-environment':
          case 'auth/popup-blocked':
          case 'auth/popup-closed-by-user':
          case 'auth/unauthorized-domain':
            this.openSnackbar(message);
            return;

          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Sends a password reset email to the given email address.
   * @param emailAddress
   */
  resetPassword = (emailAddress) => {
    if (this.state.isSignedIn) {
      return;
    }

    if (!emailAddress) {
      return;
    }

    const errors = validate({
      emailAddress
    }, constraints.resetPassword);

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.sendPasswordResetEmail(emailAddress).then(() => {
        this.closeResetPasswordDialog(() => {
          this.openSnackbar(`Password reset e-mail sent to ${emailAddress}`);
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/invalid-email':
          case 'auth/missing-android-pkg-name':
          case 'auth/missing-continue-uri':
          case 'auth/missing-ios-bundle-id':
          case 'auth/invalid-continue-uri':
          case 'auth/unauthorized-continue-uri':
          case 'auth/user-not-found':
            this.openSnackbar(message);
            return;

          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Sends a verification email to a user.
   */
  verifyEmailAddress = () => {
    const { user, isSignedIn } = this.state;

    if (!user || !user.email || !isSignedIn) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      user.sendEmailVerification().then(() => {
        const emailAddress = user.email;

        this.openSnackbar(`Verification e-mail sent to ${emailAddress}`);
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/missing-android-pkg-name':
          case 'auth/missing-continue-uri':
          case 'auth/missing-ios-bundle-id':
          case 'auth/invalid-continue-uri':
          case 'auth/unauthorized-continue-uri':
            this.openSnackbar(message);
            return;

          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  changeDisplayName = () => {
    const { user, isSignedIn } = this.state;

    if (!user || !isSignedIn) {
      return;
    }

    const { displayName } = this.state;

    if (!displayName) {
      return;
    }

    if (displayName === user.displayName) {
      this.openSnackbar(`Your name is already ${displayName}`);

      return;
    }

    const errors = validate({ displayName }, constraints.changeDisplayName);

    if (errors) {
      return;
    }

    if (errors) {
      this.setState({
        changeDisplayNameDialog: {
          errors
        }
      });

      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      user.updateProfile({ displayName }).then(() => {
        this.closeChangeDisplayNameDialog(() => {
          this.openSnackbar('Display name changed');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Signs out the current user.
   */
  signOut = () => {
    if (!this.state.isSignedIn) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signOut().then(() => {
        this.closeSignOutDialog(() => {
          this.openSnackbar('Signed out');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  /**
   * Changes the current theme. Theme is applied in real-time.
   * @param palette
   * @param removeLocalStorage
   * @param callback
   */
  updateTheme = (palette, removeLocalStorage, callback) => {
    const { primaryColor, secondaryColor, type } = this.state;

    if (!palette.primaryColor) {
      palette.primaryColor = primaryColor;
    }

    if (!palette.secondaryColor) {
      palette.secondaryColor = secondaryColor;
    }

    if (!palette.type) {
      palette.type = type;
    }

    theme = createMuiTheme({
      palette: {
        primary: colors.find(color => color.id === palette.primaryColor).import,
        secondary: colors.find(color => color.id === palette.secondaryColor).import,
        type: palette.type
      },

      typography: {
        useNextVariants: true
      }
    });

    this.setState({
      primaryColor: palette.primaryColor,
      secondaryColor: palette.secondaryColor,
      type: palette.type
    }, () => {
      if (removeLocalStorage) {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', JSON.stringify({
          primaryColor: palette.primaryColor,
          secondaryColor: palette.secondaryColor,
          type: palette.type
        }));
      }

      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * Resets the current theme to the default one.
   */
  resetTheme = () => {
    this.updateTheme({
      primaryColor: defaultTheme.primaryColor,
      secondaryColor: defaultTheme.secondaryColor,
      type: defaultTheme.type
    }, true, () => {
      this.openSnackbar('Settings reset');
    });
  };

  changePrimaryColor = (event) => {
    const primaryColor = event.target.value;

    this.updateTheme({
      primaryColor
    });
  };

  changeSecondaryColor = (event) => {
    const secondaryColor = event.target.value;

    this.updateTheme({
      secondaryColor
    });
  };

  changeType = (event) => {
    const type = event.target.value;

    this.updateTheme({
      type
    });
  };

  showSignUpDialog = () => {
    this.setState({
      signUpDialog: {
        open: true
      }
    });
  };

  closeSignUpDialog = (callback) => {
    this.setState({
      signUpDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  showSignInDialog = () => {
    this.setState({
      signInDialog: {
        open: true
      }
    });
  };

  closeSignInDialog = (callback) => {
    this.setState({
      signInDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  showResetPasswordDialog = () => {
    this.setState({
      resetPasswordDialog: {
        open: true
      }
    });
  };

  closeResetPasswordDialog = (callback) => {
    this.setState({
      resetPasswordDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  showSettingsDialog = () => {
    this.setState({
      settingsDialog: {
        open: true
      }
    });
  };

  closeSettingsDialog = (callback) => {
    this.setState({
      settingsDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  openChangeDisplayNameDialog = () => {
    this.setState({
      changeDisplayNameDialog: {
        open: true
      }
    });
  };

  closeChangeDisplayNameDialog = (callback) => {
    this.setState({
      changeDisplayNameDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  showSignOutDialog = () => {
    this.setState({
      signOutDialog: {
        open: true
      }
    });
  };

  closeSignOutDialog = (callback) => {
    this.setState({
      signOutDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  handleDisplayNameChange = (event) => {
    const displayName = event.target.value;

    this.setState({ displayName });
  };

  /**
   * Opens a snackbar. Snackbars provide brief messages about app processes through a message.
   */
  openSnackbar = (message) => {
    this.setState({
      snackbar: {
        autoHideDuration: readingTime(message).time * 2,
        message,
        open: true
      }
    });
  };

  /**
   * Sets the `open` state of a snackbar to `false`. A direct response to the snackbar's `onClose` event.
   * @param clearMessage Whether or not to clear the message of the snackbar.
   */
  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? '' : snackbar.message,
        open: false
      }
    });
  };

  render() {
    const { classes } = this.props;

    // Properties
    const {
      primaryColor,
      secondaryColor,
      type,
      isAuthReady,
      isPerformingAuthAction,
      isSignedIn,
      user,
      displayName
    } = this.state;

    // Dialogs
    const {
      signUpDialog,
      signInDialog,
      resetPasswordDialog,
      settingsDialog,
      changeDisplayNameDialog,
      signOutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
      <Router basename="/react-material-ui-firebase">
        <MuiThemeProvider theme={theme}>
          <div style={{ minHeight: '100vh', backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa' }}>
            {!isAuthReady &&
              <LaunchScreen />
            }

            {isAuthReady &&
              <React.Fragment>
                <Bar
                  name={settings.name}

                  isSignedIn={isSignedIn}
                  isPerformingAuthAction={isPerformingAuthAction}

                  user={user}

                  onSignUpClick={this.showSignUpDialog}
                  onSignInClick={this.showSignInDialog}

                  onSettingsClick={this.showSettingsDialog}
                  onSignOutClick={this.showSignOutDialog}
                />

                {isSignedIn &&
                  <React.Fragment>
                    <Switch>
                      <Route path="/" exact component={HomeContent} />
                      <Route component={NotFoundContent} />
                    </Switch>

                    <Hidden only="xs">
                      <SettingsDialog
                        open={settingsDialog.open}
                        user={user}
                        isPerformingAuthAction={isPerformingAuthAction}
                        colors={colors}
                        types={types}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        type={type}
                        defaultTheme={defaultTheme}

                        onClose={this.closeSettingsDialog}
                        onVerifyEmailAddressClick={this.verifyEmailAddress}
                        onChangeDisplayNameClick={this.openChangeDisplayNameDialog}
                        onPrimaryColorChange={this.changePrimaryColor}
                        onSecondaryColorChange={this.changeSecondaryColor}
                        onTypeChange={this.changeType}
                        onResetClick={this.resetTheme}
                      />
                    </Hidden>

                    <Hidden only={['sm', 'md', 'lg', 'xl']}>
                      <SettingsDialog
                        open={settingsDialog.open}
                        fullScreen
                        user={user}
                        isPerformingAuthAction={isPerformingAuthAction}
                        colors={colors}
                        types={types}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        type={type}
                        defaultTheme={defaultTheme}

                        onClose={this.closeSettingsDialog}
                        onChangeDisplayNameClick={this.openChangeDisplayNameDialog}
                        onVerifyEmailAddressClick={this.verifyEmailAddress}
                        onPrimaryColorChange={this.changePrimaryColor}
                        onSecondaryColorChange={this.changeSecondaryColor}
                        onTypeChange={this.changeType}
                        onResetClick={this.resetTheme}
                      />
                    </Hidden>

                    <InputDialog
                      open={changeDisplayNameDialog.open}

                      title="Change display name"
                      contentText="Your display name is used to represent you. It's visible to other users and can be changed any time."
                      textField={
                        <TextField
                          autoComplete="name"
                          autoFocus
                          error={!!(changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName)}
                          fullWidth
                          helperText={(changeDisplayNameDialog.errors && changeDisplayNameDialog.errors.displayName) ? changeDisplayNameDialog.errors.displayName[0] : ''}
                          margin="normal"
                          onChange={this.handleDisplayNameChange}
                          placeholder={user.displayName}
                          required
                          type="text"
                          value={displayName}
                        />
                      }
                      okText="Change"
                      disableOkButton={!displayName || isPerformingAuthAction}
                      highlightOkButton

                      onClose={this.closeChangeDisplayNameDialog}
                      onExited={() => {
                        this.setState({
                          displayName: ''
                        });
                      }}

                      onCancelClick={this.closeChangeDisplayNameDialog}
                      onOkClick={this.changeDisplayName}
                    />

                    <ConfirmationDialog
                      open={signOutDialog.open}

                      title="Sign out?"
                      contentText="While signed out you are unable to manage your profile and conduct other activities that require you to be signed in."
                      okText="Sign Out"
                      disableOkButton={isPerformingAuthAction}
                      highlightOkButton

                      onClose={this.closeSignOutDialog}
                      onCancelClick={this.closeSignOutDialog}
                      onOkClick={this.signOut}
                    />
                  </React.Fragment>
                }

                {!isSignedIn &&
                  <React.Fragment>
                    <EmptyState
                      icon={<CodeIcon className={classes.emptyStateIcon} color="action" />}
                      title={settings.name}
                      description="The three musketeers, all in one pack in the form of a boilerplate app."
                      button={
                        <Fab className={classes.button} color="primary" href="https://github.com/Phoqe/react-material-ui-firebase" rel="noopener noreferrer" target="_blank" variant="extended">
                          <GitHubCircleIcon className={classes.buttonIcon} />
                          GitHub
                        </Fab>
                      }
                    />

                    <Hidden only="xs">
                      <SignUpDialog
                        open={signUpDialog.open}
                        isPerformingAuthAction={isPerformingAuthAction}
                        constraints={constraints.signUp}

                        signUp={this.signUp}

                        onClose={this.closeSignUpDialog}
                        onAuthProviderClick={this.signInWithProvider}
                      />
                    </Hidden>

                    <Hidden only={['sm', 'md', 'lg', 'xl']}>
                      <SignUpDialog
                        open={signUpDialog.open}
                        fullScreen
                        isPerformingAuthAction={isPerformingAuthAction}
                        constraints={constraints.signUp}

                        signUp={this.signUp}

                        onClose={this.closeSignUpDialog}
                        onAuthProviderClick={this.signInWithProvider}
                      />
                    </Hidden>

                    <Hidden only="xs">
                      <SignInDialog
                        open={signInDialog.open}
                        isPerformingAuthAction={isPerformingAuthAction}
                        constraints={constraints.signIn}

                        signIn={this.signIn}

                        onClose={this.closeSignInDialog}
                        onAuthProviderClick={this.signInWithProvider}
                        onResetPasswordClick={this.showResetPasswordDialog}
                      />
                    </Hidden>

                    <Hidden only={['sm', 'md', 'lg', 'xl']}>
                      <SignInDialog
                        open={signInDialog.open}
                        fullScreen
                        isPerformingAuthAction={isPerformingAuthAction}
                        constraints={constraints.signIn}

                        signIn={this.signIn}

                        onClose={this.closeSignInDialog}
                        onAuthProviderClick={this.signInWithProvider}
                        onResetPasswordClick={this.showResetPasswordDialog}
                      />
                    </Hidden>

                    <ResetPasswordDialog
                      open={resetPasswordDialog.open}
                      isPerformingAuthAction={isPerformingAuthAction}
                      constraints={constraints.resetPassword}

                      resetPassword={this.resetPassword}

                      onClose={this.closeResetPasswordDialog}
                    />
                  </React.Fragment>
                }

                <Snackbar
                  autoHideDuration={snackbar.autoHideDuration}
                  message={snackbar.message}
                  open={snackbar.open}
                  onClose={this.closeSnackbar}
                />
              </React.Fragment>
            }
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }

  componentDidMount() {
    const theme = JSON.parse(localStorage.getItem('theme'));

    if (theme) {
      this.updateTheme(theme);
    }

    this.removeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isAuthReady: true,
        isSignedIn: !!user,
        user
      });
    });
  }

  componentWillUnmount() {
    this.removeAuthObserver();
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
