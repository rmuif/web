import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import validate from 'validate.js';

import readingTime from 'reading-time';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import firebase, { auth, firestore } from '../firebase';
import colors from '../colors';
import settings from '../settings';
import constraints from '../constraints';

import LaunchScreen from '../layout/LaunchScreen/LaunchScreen';

import Bar from '../layout/Bar/Bar';

import HomeContent from '../content/HomeContent/HomeContent';
import NotFoundContent from '../content/NotFoundContent/NotFoundContent';

import DialogHost from '../DialogHost/DialogHost';

let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      primaryColor: settings.theme.primaryColor.name,
      secondaryColor: settings.theme.secondaryColor.name,
      type: settings.theme.type,

      isAuthReady: false,
      isPerformingAuthAction: false,
      isSignedIn: false,

      user: null,
      userData: null,
      avatar: '',
      displayName: '',
      emailAddress: '',

      signUpDialog: {
        open: false
      },

      signInDialog: {
        open: false
      },

      resetPasswordDialog: {
        open: false
      },

      welcomeDialog: {
        open: false
      },

      settingsDialog: {
        open: true
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

  openDialog = (dialogKey, callback) => {

    // Retrieve the dialog with the specified key
    const dialog = this.state[dialogKey];

    // Make sure the dialog exists and is valid
    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = true;

    this.setState({ dialog }, callback);
  };

  closeDialog = (dialogKey, callback) => {

    // Retrieve the dialog with the specified key
    const dialog = this.state[dialogKey];

    // Make sure the dialog exists and is valid
    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = false;

    this.setState({ dialog }, callback);
  };

  signUp = (firstName, lastName, username, emailAddress, emailAddressConfirmation, password, passwordConfirmation) => {
    if (!firstName ||
      !lastName ||
      !username ||
      !emailAddress ||
      !emailAddressConfirmation ||
      !password ||
      !passwordConfirmation) {
      return;
    }

    if (this.state.isSignedIn) {
      return;
    }

    const errors = validate({
      firstName: firstName,
      lastName: lastName,
      username: username,
      emailAddress: emailAddress,
      emailAddressConfirmation: emailAddressConfirmation,
      password: password,
      passwordConfirmation: passwordConfirmation
    }, {
      firstName: constraints.firstName,
      lastName: constraints.lastName,
      username: constraints.username,
      emailAddress: constraints.emailAddress,
      emailAddressConfirmation: constraints.emailAddressConfirmation,
      password: constraints.password,
      passwordConfirmation: constraints.passwordConfirmation
    });

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.createUserWithEmailAndPassword(emailAddress, password).then((value) => {

        const user = value.user;
        const uid = user.uid;

        firestore.collection('users').doc(uid).set({
          firstName: firstName,
          lastName: lastName,
          username: username
        }).then((value) => {
          this.closeDialog('signUpDialog', () => {
            this.openDialog('welcomeDialog');
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.openSnackbar(message);
              return;
          }
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

  signIn = (emailAddress, password) => {
    if (!emailAddress || !password) {
      return;
    }

    if (this.state.isSignedIn) {
      return;
    }

    const errors = validate({
      emailAddress: emailAddress,
      password: password,
    }, {
      emailAddress: constraints.emailAddress,
      password: constraints.password
    });

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signInWithEmailAndPassword(emailAddress, password).then((value) => {
        this.closeDialog('signInDialog', () => {
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

  signInWithAuthProvider = (providerId) => {
    if (!providerId) {
      return;
    }

    if (this.state.isSignedIn) {
      return;
    }

    const provider = new firebase.auth.OAuthProvider(providerId);

    if (!provider) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signInWithPopup(provider).then((value) => {
        this.closeDialog('signUpDialog', () => {
          this.closeDialog('signInDialog', () => {
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

  resetPassword = (emailAddress) => {
    if (!emailAddress) {
      return;
    }

    if (this.state.isSignedIn) {
      return;
    }

    const errors = validate({
      emailAddress: emailAddress
    }, {
      emailAddress: constraints.emailAddress
    });

    if (errors) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.sendPasswordResetEmail(emailAddress).then(() => {
        this.closeDialog('resetPasswordDialog', () => {
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

  verifyEmailAddress = (callback) => {
    const { user, isSignedIn } = this.state;

    if (!user || !user.email || !isSignedIn) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      user.sendEmailVerification().then(() => {
        this.setState({
          isVerifyingEmailAddress: true
        }, () => {
          const emailAddress = user.email;

          this.openSnackbar(`Verification e-mail sent to ${emailAddress}`);

          if (callback && typeof callback === 'function') {
            callback();
          }
        });
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

  signOut = () => {
    if (!this.state.isSignedIn) {
      return;
    }

    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signOut().then(() => {
        this.closeDialog('signOutDialog', () => {
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

  resetTheme = () => {
    this.updateTheme({
      primaryColor: settings.theme.primaryColor.name,
      secondaryColor: settings.theme.secondaryColor.name,
      type: settings.theme.type
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

  openSnackbar = (message, callback) => {
    this.setState({
      snackbar: {
        autoHideDuration: readingTime(message).time * 2,
        message,
        open: true
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

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
    const {
      primaryColor,
      secondaryColor,
      type,
      isAuthReady,
      isPerformingAuthAction,
      isVerifyingEmailAddress,
      isSignedIn,
      user,
      userData
    } = this.state;

    const {
      signUpDialog,
      signInDialog,
      resetPasswordDialog,
      welcomeDialog,
      settingsDialog,
      signOutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div style={{ minHeight: '100vh', backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa' }}>
            {!isAuthReady &&
              <LaunchScreen />
            }

            {isAuthReady &&
              <React.Fragment>
                <Bar
                  title={settings.title}

                  isSignedIn={isSignedIn}
                  isPerformingAuthAction={isPerformingAuthAction}

                  user={user}

                  onSignUpClick={() => this.openDialog('signUpDialog')}
                  onSignInClick={() => this.openDialog('signInDialog')}

                  onSettingsClick={() => this.openDialog('settingsDialog')}
                  onSignOutClick={() => this.openDialog('signOutDialog')}
                />

                <Switch>
                  <Route path="/" exact render={() => (<HomeContent isSignedIn={isSignedIn} title={settings.title} />)} />
                  <Route component={NotFoundContent} />
                </Switch>

                <DialogHost
                  isSignedIn={isSignedIn}
                  dialogs={
                    {
                      signUpDialog: {
                        dialogProps: {
                          open: signUpDialog.open,

                          onClose: () => this.closeDialog('signUpDialog')
                        },

                        props: {
                          isPerformingAuthAction: isPerformingAuthAction,

                          signUp: this.signUp,

                          onAuthProviderClick: this.signInWithAuthProvider
                        }
                      },

                      signInDialog: {
                        dialogProps: {
                          open: signInDialog.open,

                          onClose: () => this.closeDialog('signInDialog')
                        },

                        props: {
                          isPerformingAuthAction: isPerformingAuthAction,

                          resetPassword: this.resetPassword,
                          signIn: this.signIn,

                          onAuthProviderClick: this.signInWithAuthProvider
                        }
                      },

                      resetPasswordDialog: {
                        dialogProps: {
                          open: resetPasswordDialog.open,

                          onClose: () => this.closeDialog('resetPasswordDialog')
                        },

                        props: {
                          isPerformingAuthAction: isPerformingAuthAction,

                          resetPassword: this.resetPassword
                        }
                      },

                      welcomeDialog: {
                        dialogProps: {
                          open: welcomeDialog.open,

                          onClose: () => this.closeDialog('welcomeDialog')
                        },

                        props: {
                          title: `Welcome to ${settings.title}!`,
                          contentText: 'Complete your account by verifying your e-mail address. An e-mail will be sent to your e-mail address containing instructions on how to verify your e-mail address.',
                          dismissiveAction: <Button color="primary" onClick={() => this.closeDialog('welcomeDialog')}>Cancel</Button>,
                          confirmingAction: <Button color="primary" disabled={isPerformingAuthAction} variant="contained" onClick={() => this.verifyEmailAddress(() => this.closeDialog('welcomeDialog'))}>Verify</Button>
                        }
                      },

                      settingsDialog: {
                        dialogProps: {
                          open: settingsDialog.open,
                          disableEscapeKeyDown: true,

                          onClose: () => this.closeDialog('settingsDialog')
                        },

                        props: {
                          user: user,
                          userData: userData,

                          openSnackbar: this.openSnackbar
                        }
                      },

                      signOutDialog: {
                        dialogProps: {
                          open: signOutDialog.open,

                          onClose: () => this.closeDialog('signOutDialog')
                        },

                        props: {
                          title: 'Sign out?',
                          contentText: 'While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.',
                          dismissiveAction: <Button color="primary" onClick={() => this.closeDialog('signOutDialog')}>Cancel</Button>,
                          confirmingAction: <Button color="primary" disabled={isPerformingAuthAction} variant="contained" onClick={this.signOut}>Sign Out</Button>
                        }
                      }
                    }
                  }
                />

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
    this._isMounted = true;

    const theme = JSON.parse(localStorage.getItem('theme'));

    if (theme) {
      this.updateTheme(theme);
    }

    this.removeAuthObserver = auth.onAuthStateChanged((user) => {
      if (this._isMounted) {
        if (user) {
          const uid = user.uid;

          this.removeUserObserver = firestore.collection('users').doc(uid).onSnapshot((documentSnapshot) => {
            const data = documentSnapshot.data();

            this.setState({
              isAuthReady: true,
              isSignedIn: true,
              user: user,
              userData: data
            });
          });
        } else {
          this.setState({
            isAuthReady: true,
            isSignedIn: false,
            user: null,
            userData: null
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.removeAuthObserver();

    if (this.state.isSignedIn) {
      this.removeUserObserver();
    }
  }
}

export default App;
