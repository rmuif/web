import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import readingTime from 'reading-time';

import { createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import SignUpDialog from './dialogs/SignUpDialog';
import SignInDialog from './dialogs/SignInDialog';
import ResetPasswordDialog from './dialogs/ResetPasswordDialog';
import SignOutDialog from './dialogs/SignOutDialog';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(config);

const settings = {
  title: 'React + Material-UI + Firebase'
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing.unit
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { isSigningUp, isSigningIn, isResettingPassword, isSignedIn, isSigningOut, signUpDialog, signInDialog, resetPasswordDialog, signOutDialog, snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar color="primary" position="static">
          <Toolbar variant="regular">
            <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{settings.title}</Typography>

            {!isSignedIn &&
              <div>
                <Button className={classes.signUpButton} color="secondary" disabled={isSigningUp} variant="contained" onClick={this.showSignUpDialog}>Sign Up</Button>
                <Button color="secondary" disabled={isSigningIn} variant="contained" onClick={this.showSignInDialog}>Sign In</Button>
              </div>
            }

            {isSignedIn && <Button color="secondary" variant="contained" onClick={this.showSignOutDialog}>Sign Out</Button>}
          </Toolbar>
        </AppBar>

        <SignUpDialog open={signUpDialog.open} isSigningUp={isSigningUp} signUp={this.signUp} onClose={this.closeSignUpDialog} />
        <SignInDialog open={signInDialog.open} isSigningIn={isSigningIn} signIn={this.signIn} onClose={this.closeSignInDialog} onResetPasswordClick={this.showResetPasswordDialog} />
        <ResetPasswordDialog open={resetPasswordDialog.open} isResettingPassword={isResettingPassword} resetPassword={this.resetPassword} onClose={this.closeResetPasswordDialog} />
        <SignOutDialog open={signOutDialog.open} isSigningOut={isSigningOut} signOut={this.signOut} onClose={this.closeSignOutDialog} />

        <Snackbar autoHideDuration={snackbar.autoHideDuration} message={snackbar.message} onClose={this.closeSnackbar} open={snackbar.open} />
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.removeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
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