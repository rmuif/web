import React, { Component } from 'react';

import readingTime from 'reading-time';

import { MuiThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { auth, firestore } from '../../firebase';
import authentication from '../../services/authentication';
import theming from '../../services/theming';

import LaunchScreen from '../LaunchScreen';

import Bar from '../Bar';

import Router from '../Router';
import DialogHost from '../DialogHost';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userData: null,
      theme: theming.defaultTheme,

      signedIn: false,
      ready: false,
      performingAction: false,

      signUpDialog: {
        open: false
      },

      signInDialog: {
        open: false
      },

      settingsDialog: {
        open: false
      },

      deleteAccountDialog: {
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

  openDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = true;

    this.setState({ dialog }, callback);
  };

  closeDialog = (dialogId, callback) => {
    const dialog = this.state[dialogId];

    if (!dialog || dialog.open === undefined || null) {
      return;
    }

    dialog.open = false;

    this.setState({ dialog }, callback);
  };

  deleteAccount = () => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.deleteAccount().then(() => {
        this.closeDialog('deleteAccountDialog', () => {
          this.openSnackbar('Deleted account');
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
          performingAction: false
        });
      });
    });
  };

  signOut = () => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.signOut().then(() => {
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
          performingAction: false
        });
      });
    });
  };

  openSnackbar = (message, autoHideDuration = 2, callback) => {
    this.setState({
      snackbar: {
        autoHideDuration: readingTime(message).time * autoHideDuration,
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
      user,
      userData,
      theme,
      signedIn,
      ready,
      performingAction,
    } = this.state;

    const {
      signUpDialog,
      signInDialog,
      settingsDialog,
      deleteAccountDialog,
      signOutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {!ready &&
          <LaunchScreen />
        }

        {ready &&
          <>
            <Bar
              signedIn={signedIn}
              performingAction={performingAction}

              user={user}
              userData={userData}

              onSignUpClick={() => this.openDialog('signUpDialog')}
              onSignInClick={() => this.openDialog('signInDialog')}

              onSettingsClick={() => this.openDialog('settingsDialog')}
              onSignOutClick={() => this.openDialog('signOutDialog')}
            />

            <Router signedIn={signedIn} />

            <DialogHost
              signedIn={signedIn}
              dialogs={
                {
                  signUpDialog: {
                    dialogProps: {
                      open: signUpDialog.open,

                      onClose: (callback) => {
                        this.closeDialog('signUpDialog');

                        if (callback && typeof callback === 'function') {
                          callback();
                        }
                      }
                    },

                    props: {
                      performingAction: performingAction,

                      openSnackbar: this.openSnackbar
                    }
                  },

                  signInDialog: {
                    dialogProps: {
                      open: signInDialog.open,

                      onClose: (callback) => {
                        this.closeDialog('signInDialog');

                        if (callback && typeof callback === 'function') {
                          callback();
                        }
                      }
                    },

                    props: {
                      performingAction: performingAction,

                      openSnackbar: this.openSnackbar
                    }
                  },

                  settingsDialog: {
                    dialogProps: {
                      open: settingsDialog.open,

                      onClose: () => this.closeDialog('settingsDialog')
                    },

                    props: {
                      user: user,
                      userData: userData,
                      theme: theme,

                      openSnackbar: this.openSnackbar,

                      onDeleteAccountClick: () => this.openDialog('deleteAccountDialog')
                    }
                  },

                  deleteAccountDialog: {
                    dialogProps: {
                      open: deleteAccountDialog.open,

                      onClose: () => this.closeDialog('deleteAccountDialog')
                    },

                    props: {
                      performingAction: performingAction,
                      userData: userData,

                      deleteAccount: this.deleteAccount
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
                      confirmingAction: <Button color="primary" disabled={performingAction} variant="contained" onClick={this.signOut}>Sign Out</Button>
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
          </>
        }
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.mounted = true;

    this.removeAuthStateChangedObserver = auth.onAuthStateChanged((user) => {
      if (!user) {
        if (this.removeReferenceListener) {
          this.removeReferenceListener();
        }

        if (this.mounted) {
          this.setState({
            user: null,
            userData: null,
            theme: theming.defaultTheme,

            signedIn: false,
            ready: true
          });
        }

        return;
      }

      const uid = user.uid;

      if (!uid) {
        if (this.removeReferenceListener) {
          this.removeReferenceListener();
        }

        if (this.mounted) {
          this.setState({
            user: null,
            userData: null,
            theme: theming.defaultTheme,

            signedIn: false,
            ready: true
          });
        }

        return;
      }

      const reference = firestore.collection('users').doc(uid);

      if (!reference) {
        if (this.removeReferenceListener) {
          this.removeReferenceListener();
        }

        if (this.mounted) {
          this.setState({
            user: null,
            userData: null,
            theme: theming.defaultTheme,

            signedIn: false,
            ready: true
          });
        }

        return;
      }

      this.removeReferenceListener = reference.onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          if (this.removeReferenceListener) {
            this.removeReferenceListener();
          }

          if (this.mounted) {
            this.setState({
              user: null,
              userData: null,
              theme: theming.defaultTheme,

              signedIn: false,
              ready: true
            });
          }

          return;
        }

        const data = snapshot.data();

        if (!data) {
          if (this.removeReferenceListener) {
            this.removeReferenceListener();
          }

          if (this.mounted) {
            this.setState({
              user: null,
              userData: null,
              theme: theming.defaultTheme,

              signedIn: false,
              ready: true
            });
          }

          return;
        }

        if (data.theme) {
          this.setState({
            theme: theming.createTheme(data.theme)
          });
        } else {
          this.setState({
            theme: theming.defaultTheme
          });
        }

        if (this.mounted) {
          this.setState({
            user: user,
            userData: data,

            signedIn: true,
            ready: true
          });
        }
      }, (error) => {
        if (this.removeReferenceListener) {
          this.removeReferenceListener();
        }

        if (this.mounted) {
          this.setState({
            user: null,
            userData: null,
            theme: theming.defaultTheme,

            signedIn: false,
            ready: true
          }, () => {
            const code = error.code;
            const message = error.message;

            switch (code) {
              default:
                this.openSnackbar(message);
                return;
            }
          });
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.removeAuthStateChangedObserver) {
      this.removeAuthStateChangedObserver();
    }

    if (this.removeReferenceListener) {
      this.removeReferenceListener();
    }

    this.mounted = false;
  }
}

export default App;
