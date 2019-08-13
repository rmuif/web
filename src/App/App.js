import React, { Component } from 'react';

import readingTime from 'reading-time';

import { MuiThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { auth, firestore } from '../firebase';
import settings from '../settings';
import authentication from '../authentication';
import theme from '../theme';

import LaunchScreen from '../layout/LaunchScreen/LaunchScreen';

import Bar from '../layout/Bar/Bar';

import Router from '../Router/Router';
import DialogHost from '../DialogHost/DialogHost';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,

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
      ready,
      performingAction,
      signedIn,
      user
    } = this.state;

    const {
      signUpDialog,
      signInDialog,
      settingsDialog,
      signOutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme.defaultTheme}>
        <div style={{ minHeight: '100vh', backgroundColor: theme.currentTheme.palette.type === 'dark' ? '#303030' : '#fafafa' }}>
          {!ready &&
            <LaunchScreen />
          }

          {ready &&
            <React.Fragment>
              <Bar
                title={settings.title}

                signedIn={signedIn}
                performingAction={performingAction}

                user={user}

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
                        disableEscapeKeyDown: true,

                        onClose: () => this.closeDialog('settingsDialog')
                      },

                      props: {
                        user: user,

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
            </React.Fragment>
          }
        </div>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          user: null,

          signedIn: false,
          ready: true
        });

        return;
      }

      const uid = user.uid;

      if (!uid) {
        this.setState({
          user: null,

          signedIn: false,
          ready: true
        });

        return;
      }

      const reference = firestore.collection('users').doc(uid);

      if (!reference) {
        this.setState({
          user: null,

          signedIn: false,
          ready: true
        });

        return;
      }

      reference.onSnapshot((snapshot) => {
        if (!snapshot.exists) {
          this.setState({
            user: null,

            signedIn: false,
            ready: true
          });

          return;
        }

        const data = snapshot.data();

        if (!data) {
          this.setState({
            user: null,

            signedIn: false,
            ready: true
          });

          return;
        }

        this.setState({
          user: {
            ...user,
            ...data
          },

          signedIn: true,
          ready: true
        });
      }, (error) => {
        this.setState({
          user: null,

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
      });
    });
  }
}

export default App;
