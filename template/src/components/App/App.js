import React, { Component } from "react";

import readingTime from "reading-time";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { CssBaseline, Button, Snackbar } from "@mui/material";

import { auth, firestore } from "../../firebase";
import authentication from "../../services/authentication";

import ErrorBoundary from "../ErrorBoundary";
import LaunchScreen from "../LaunchScreen";
import Bar from "../Bar";
import Router from "../Router";
import DialogHost from "../DialogHost";
import { appearance, ThemeContext } from "../../context/ThemeContext";

const initialState = {
  ready: false,
  performingAction: false,
  user: null,
  userData: null,
  roles: [],

  aboutDialog: {
    open: false,
  },

  signUpDialog: {
    open: false,
  },

  signInDialog: {
    open: false,
  },

  settingsDialog: {
    open: false,
  },

  deleteAccountDialog: {
    open: false,
  },

  signOutDialog: {
    open: false,
  },

  snackbar: {
    autoHideDuration: 0,
    message: "",
    open: false,
  },
};

class App extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      ...initialState,
      theme: context.defaultTheme,
    };
  }

  resetState = (callback) => {
    let { defaultTheme } = this.context;

    this.setState(
      {
        ready: true,
        theme: defaultTheme,
        user: null,
        userData: null,
        roles: [],
      },
      callback
    );
  };

  setTheme = (theme, updateData = true) => {
    const { createTheme, defaultTheme, changeTheme } = this.context;

    return new Promise((resolve, reject) => {
      if (!theme) {
        this.setState({ theme: defaultTheme }, () => {
          resolve();
        });

        return;
      }

      this.setState({ theme: createTheme(theme) }, () => {
        if (updateData) {
          changeTheme(theme)
            .then(() => {
              resolve();
            })
            .catch((reason) => {
              reject(reason);
            });
        } else {
          resolve();
        }
      });
    });
  };

  resetTheme = () => {
    const { resetTheme: process, defaultTheme } = this.context;

    return new Promise((resolve, reject) => {
      process()
        .then(() => {
          this.setState({ theme: defaultTheme }, () => {
            resolve();
          });
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

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

  closeAllDialogs = (callback) => {
    this.setState(
      {
        aboutDialog: {
          open: false,
        },

        signUpDialog: {
          open: false,
        },

        signInDialog: {
          open: false,
        },

        settingsDialog: {
          open: false,
        },

        deleteAccountDialog: {
          open: false,
        },

        signOutDialog: {
          open: false,
        },
      },
      callback
    );
  };

  deleteAccount = () => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .deleteAccount()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Deleted account");
            });
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  signOut = () => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .signOut()
          .then(() => {
            this.closeAllDialogs(() => {
              this.openSnackbar("Signed out");
            });
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  openSnackbar = (message, autoHideDuration = 2, callback) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
        },
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false,
      },
    });
  };

  render() {
    const {
      ready,
      performingAction,
      theme,
      user,
      userData,
      roles,
    } = this.state;

    const {
      aboutDialog,
      signUpDialog,
      signInDialog,
      settingsDialog,
      deleteAccountDialog,
      signOutDialog,
    } = this.state;

    const { snackbar } = this.state;

    return (
      <StyledEngineProvider injectFirst>
        <ThemeContext.Provider
          value={{
            ...appearance,
            theme,
            setTheme: this.setTheme,
            resetTheme: this.resetTheme,
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <ErrorBoundary>
              {!ready && <LaunchScreen />}

              {ready && (
                <>
                  <Router
                    user={user}
                    roles={roles}
                    bar={
                      <Bar
                        performingAction={performingAction}
                        theme={theme}
                        user={user}
                        userData={userData}
                        roles={roles}
                        onSignUpClick={() => this.openDialog("signUpDialog")}
                        onSignInClick={() => this.openDialog("signInDialog")}
                        onAboutClick={() => this.openDialog("aboutDialog")}
                        onSettingsClick={() =>
                          this.openDialog("settingsDialog")
                        }
                        onSignOutClick={() => this.openDialog("signOutDialog")}
                      />
                    }
                    openSnackbar={this.openSnackbar}
                  />

                  <DialogHost
                    performingAction={performingAction}
                    theme={theme}
                    user={user}
                    userData={userData}
                    openSnackbar={this.openSnackbar}
                    dialogs={{
                      aboutDialog: {
                        dialogProps: {
                          open: aboutDialog.open,

                          onClose: () => this.closeDialog("aboutDialog"),
                        },
                      },

                      signUpDialog: {
                        dialogProps: {
                          open: signUpDialog.open,

                          onClose: (callback) => {
                            this.closeDialog("signUpDialog");

                            if (callback && typeof callback === "function") {
                              callback();
                            }
                          },
                        },
                      },

                      signInDialog: {
                        dialogProps: {
                          open: signInDialog.open,

                          onClose: (callback) => {
                            this.closeDialog("signInDialog");

                            if (callback && typeof callback === "function") {
                              callback();
                            }
                          },
                        },
                      },

                      settingsDialog: {
                        dialogProps: {
                          open: settingsDialog.open,

                          onClose: () => this.closeDialog("settingsDialog"),
                        },

                        props: {
                          onDeleteAccountClick: () =>
                            this.openDialog("deleteAccountDialog"),
                        },
                      },

                      deleteAccountDialog: {
                        dialogProps: {
                          open: deleteAccountDialog.open,

                          onClose: () =>
                            this.closeDialog("deleteAccountDialog"),
                        },

                        props: {
                          deleteAccount: this.deleteAccount,
                        },
                      },

                      signOutDialog: {
                        dialogProps: {
                          open: signOutDialog.open,

                          onClose: () => this.closeDialog("signOutDialog"),
                        },

                        props: {
                          title: "Sign out?",
                          contentText:
                            "While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.",
                          dismissiveAction: (
                            <Button
                              color="primary"
                              onClick={() => this.closeDialog("signOutDialog")}
                            >
                              Cancel
                            </Button>
                          ),
                          confirmingAction: (
                            <Button
                              color="primary"
                              disabled={performingAction}
                              variant="contained"
                              onClick={this.signOut}
                            >
                              Sign Out
                            </Button>
                          ),
                        },
                      },
                    }}
                  />

                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    autoHideDuration={snackbar.autoHideDuration}
                    message={snackbar.message}
                    open={snackbar.open}
                    onClose={this.closeSnackbar}
                  />
                </>
              )}
            </ErrorBoundary>
          </ThemeProvider>
        </ThemeContext.Provider>
      </StyledEngineProvider>
    );
  }

  componentDidMount() {
    this.onAuthStateChangedObserver = auth.onAuthStateChanged(
      (user) => {
        // The user is not signed in or doesn’t have a user ID.
        if (!user || !user.uid) {
          if (this.userDocumentSnapshotListener) {
            this.userDocumentSnapshotListener();
          }

          this.resetState();

          return;
        }

        // The user is signed in, begin retrieval of external user data.
        this.userDocumentSnapshotListener = firestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(
            (snapshot) => {
              const data = snapshot.data();

              // The user doesn’t have a data point, equivalent to not signed in.
              if (!snapshot.exists || !data) {
                return;
              }

              authentication
                .getRoles()
                .then((value) => {
                  this.setTheme(data.theme, false).then(() => {
                    this.setState({
                      ready: true,
                      user: user,
                      userData: data,
                      roles: value || [],
                    });
                  });
                })
                .catch((reason) => {
                  this.resetState(() => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                      default:
                        this.openSnackbar(message);
                        return;
                    }
                  });
                });
            },
            (error) => {
              this.resetState(() => {
                const code = error.code;
                const message = error.message;

                switch (code) {
                  default:
                    this.openSnackbar(message);
                    return;
                }
              });
            }
          );
      },
      (error) => {
        this.resetState(() => {
          const code = error.code;
          const message = error.message;

          switch (code) {
            default:
              this.openSnackbar(message);
              return;
          }
        });
      }
    );
  }

  componentWillUnmount() {
    if (this.onAuthStateChangedObserver) {
      this.onAuthStateChangedObserver();
    }

    if (this.userDocumentSnapshotListener) {
      this.userDocumentSnapshotListener();
    }
  }
}

App.contextType = ThemeContext;

export default App;
