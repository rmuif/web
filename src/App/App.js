import React, { Component } from 'react';

import _ from 'lodash';
import readingTime from 'reading-time';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import firebase from '../firebase';
import settings from '../settings';
import colors from '../colors';
import authentication from '../authentication';

import LaunchScreen from '../layout/LaunchScreen/LaunchScreen';

import Bar from '../layout/Bar/Bar';

import Router from '../Router/Router';
import DialogHost from '../DialogHost/DialogHost';

let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.dark ? 'dark' : 'light'
  }
});

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
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

  changeTheme = (primaryColor, secondaryColor, dark) => {
    if (!primaryColor || !secondaryColor) {
      return;
    }

    primaryColor = _.camelCase(primaryColor);
    secondaryColor = _.camelCase(secondaryColor);

    const primary = colors[primaryColor].import;
    const secondary = colors[secondaryColor].import;
    const type = dark ? 'dark' : 'light';

    if (!primary || !secondary || !type) {
      return;
    }

    const palette = {
      primary: primary,
      secondary: secondary,
      type: type
    };

    theme = createMuiTheme({
      palette: palette
    });
  };

  resetTheme = () => {
    theme = createMuiTheme({
      palette: {
        primary: settings.theme.primaryColor.import,
        secondary: settings.theme.secondaryColor.import,
        type: settings.theme.dark ? 'dark' : 'light'
      }
    });
  };

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
      isPerformingAuthAction: true
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
          isPerformingAuthAction: false
        });
      });
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
      isAuthReady,
      isPerformingAuthAction,
      isSignedIn,
      user,
      userData
    } = this.state;

    const {
      signUpDialog,
      signInDialog,
      settingsDialog,
      signOutDialog
    } = this.state;

    const { snackbar } = this.state;

    return (
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

              <Router isSignedIn={isSignedIn} />

              <DialogHost
                isSignedIn={isSignedIn}
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
                        isPerformingAuthAction: isPerformingAuthAction,

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
                        isPerformingAuthAction: isPerformingAuthAction,

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
    );
  }

  componentDidMount() {
    this._isMounted = true;

    this.removeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (this._isMounted) {
        if (user) {
          const uid = user.uid;

          this.removeUserObserver = firebase.firestore().collection('users').doc(uid).onSnapshot((documentSnapshot) => {
            const data = documentSnapshot.data();
            const theme = data.theme;

            if (theme) {
              const primaryColor = theme.primaryColor;
              const secondaryColor = theme.secondaryColor;
              const dark = theme.dark;
  
              this.changeTheme(primaryColor, secondaryColor, dark);
            } else {
              this.resetTheme();
            }

            this.setState({
              isAuthReady: true,
              isSignedIn: true,
              user: user,
              userData: data
            });
          }, (error) => {
            const code = error.code;
            const message = error.message;
    
            switch (code) {
              default:
                this.openSnackbar(message);
                return;
            }
          });
        } else {
          if (this.removeUserObserver) {
            this.removeUserObserver();
          }

          this.setState({
            isAuthReady: true,
            isSignedIn: false,
            user: null,
            userData: null
          }, () => {
            theme = createMuiTheme({
              palette: {
                primary: settings.theme.primaryColor.import,
                secondary: settings.theme.secondaryColor.import,
                type: settings.theme.dark ? 'dark' : 'light'
              }
            });
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.removeAuthObserver();

    if (this.removeUserObserver) {
      this.removeUserObserver();
    }
  }
}

export default App;
