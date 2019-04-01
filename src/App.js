import React, { Component } from 'react';

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

import Snackbar from '@material-ui/core/Snackbar';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';

import Bar from './layout/Bar';
import EmptyState from './layout/EmptyState';

import SignUpDialog from './dialogs/SignUpDialog';
import SignInDialog from './dialogs/SignInDialog';
import ResetPasswordDialog from './dialogs/ResetPasswordDialog';
import SettingsDialog from './dialogs/SettingsDialog';
import SignOutDialog from './dialogs/SignOutDialog';

const config = {
  apiKey: 'AIzaSyDYZOrZVpXkPQD6J31mb9t2eIIxmGEJK-Q',
  authDomain: 'react-material-ui-firebase.firebaseapp.com',
  databaseURL: 'https://react-material-ui-firebase.firebaseio.com',
  projectId: 'react-material-ui-firebase',
  storageBucket: 'react-material-ui-firebase.appspot.com',
  messagingSenderId: '552659850812'
};

firebase.initializeApp(config);

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
  primaryColor: 'blue-gray',
  secondaryColor: 'red'
};

let theme = createMuiTheme({
  palette: {
    primary: blueGray,
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
  }
});

const settings = {
  title: 'React + Material-UI + Firebase'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryColor: defaultTheme.primaryColor,
      secondaryColor: defaultTheme.secondaryColor,
      type: 'light',

      isAuthReady: false,

      isSigningUp: false,
      isSigningIn: false,
      isResettingPassword: false,
      isSignedIn: false,
      isSigningOut: false,

      user: null,

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

  updateTheme = (palette) => {
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
      localStorage.setItem('theme', JSON.stringify({
        primaryColor: palette.primaryColor,
        secondaryColor: palette.secondaryColor,
        type: palette.type
      }));
    });
  };

  resetTheme = () => {
    this.updateTheme({
      primaryColor: defaultTheme.primaryColor,
      secondaryColor: defaultTheme.secondaryColor,
      type: 'light'
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
   * @param clearState Whether or not to clear the message of the snackbar.
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

  signUp = (emailAddress, password) => {
    if (this.state.isSignedIn) {
      this.openSnackbar('Signed in users can\'t sign up');
      
      return;
    }

    this.setState({
      isSigningUp: true
    }, () => {
      firebase.auth().createUserWithEmailAndPassword(emailAddress, password).then((userCredential) => {
        this.setState({
          isSigningUp: false
        }, () => {
          this.closeSignUpDialog(() => {
          const user = userCredential.user;
          const emailAddress = user.email;
    
          this.openSnackbar('Signed up as ' + emailAddress);
        });
        });
      }).catch((error) => {
        this.setState({
          isSigningUp: false
        }, () => {
          this.openSnackbar(error.message);
        });
      });
    });
  };

  signIn = (emailAddress, password) => {
    if (this.state.isSignedIn) {
      this.openSnackbar('Signed in users can\'t sign in again');
      
      return;
    }

    this.setState({
      isSigningIn: true
    }, () => {
      firebase.auth().signInWithEmailAndPassword(emailAddress, password).then((userCredential) => {
        this.setState({
          isSigningIn: false
        }, () => {
          this.closeSignInDialog(() => {
            const user = userCredential.user;
            const displayName = user.displayName;
            const emailAddress = user.email;

            this.openSnackbar('Signed in as ' + (displayName || emailAddress));
          });
        });
      }).catch((error) => {
        this.setState({
          isSigningIn: false
        }, () => {
          this.openSnackbar(error.message);
        });
      });
    });
  };

  resetPassword = (emailAddress) => {
    if (this.state.isSignedIn) {
      this.openSnackbar('Signed in users can\'t reset their password');

      return;
    }

    this.setState({
      isResettingPassword: true
    }, () => {
      firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        this.setState({
          isResettingPassword: false
        }, () => {
          this.closeResetPasswordDialog(() => {
            this.openSnackbar('Password reset email sent');
          });
        });
      }).catch((error) => {
        this.setState({
          isResettingPassword: false
        }, () => {
          this.openSnackbar(error.message);
        });
      });
    });
  };

  signOut = () => {
    if (!this.state.isSignedIn) {
      this.openSnackbar('Not signed in');

      return;
    }

    this.setState({
      isSigningOut: true
    }, () => {
      firebase.auth().signOut().then(() => {
        this.setState({
          isSigningOut: false
        }, () => {
          this.closeSignOutDialog(() => {
            this.openSnackbar('Signed out');
          });
        });
      }).catch((error) => {
        this.setState({
          isSigningOut: false
        }, () => {
          this.closeSignOutDialog(() => {
            this.openSnackbar(error.message);
          });
        });
      });
    });
  };

  render() {
    const { classes } = this.props;

    // Properties
    const { primaryColor, secondaryColor, type, isAuthReady, isSigningUp, isSigningIn, isResettingPassword, isSignedIn, isSigningOut, user } = this.state;

    // Dialogs
    const { signUpDialog, signInDialog, resetPasswordDialog, settingsDialog, signOutDialog } = this.state;

    const { snackbar } = this.state;

    if (!isAuthReady) {
      return null;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ minHeight: '100vh', backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa' }}>
          <Bar
            title={settings.title}

            isSignedIn={isSignedIn}
            isSigningUp={isSigningUp}
            isSigningIn={isSigningIn}

            onSignUpClick={this.showSignUpDialog}
            onSignInClick={this.showSignInDialog}

            onSettingsClick={this.showSettingsDialog}
            onSignOutClick={this.showSignOutDialog}
          />

          {isSignedIn &&
            <EmptyState
              icon={<PersonIcon className={classes.emptyStateIcon} color="action" />}
              text="You are signed in."
            />
          }

          {!isSignedIn &&
            <EmptyState
              icon={<PersonOutlineIcon className={classes.emptyStateIcon} color="action" />}
              text="You are not signed in."
            />
          }

          {!isSignedIn &&
            <SignUpDialog
              open={signUpDialog.open}
              isSigningUp={isSigningUp}
              signUp={this.signUp}
              onClose={this.closeSignUpDialog}
            />
          }

          {!isSignedIn &&
            <SignInDialog
              open={signInDialog.open}
              isSigningIn={isSigningIn}
              signIn={this.signIn}
              onClose={this.closeSignInDialog}
              onResetPasswordClick={this.showResetPasswordDialog}
            />
          }

          {!isSignedIn &&
            <ResetPasswordDialog
              open={resetPasswordDialog.open}
              isResettingPassword={isResettingPassword}
              resetPassword={this.resetPassword}
              onClose={this.closeResetPasswordDialog}
            />
          }

          {isSignedIn &&
            <SettingsDialog
              open={settingsDialog.open}
              user={user}
              colors={colors}
              types={types}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              type={type}

              onClose={this.closeSettingsDialog}
              onVerifyEmailAddressClick={this.verifyEmailAddress}
              onPrimaryColorChange={this.changePrimaryColor}
              onSecondaryColorChange={this.changeSecondaryColor}
              onTypeChange={this.changeType}
              onResetClick={this.resetTheme}
            />
          }

          {isSignedIn &&
            <SignOutDialog
              open={signOutDialog.open}
              isSigningOut={isSigningOut}
              signOut={this.signOut}
              onClose={this.closeSignOutDialog}
            />
          }

          <Snackbar
            autoHideDuration={snackbar.autoHideDuration}
            message={snackbar.message}
            open={snackbar.open}
            onClose={this.closeSnackbar}
          />
        </div>
      </MuiThemeProvider>
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

export default withStyles(styles)(App);