import React, { Component } from "react";

import PropTypes from "prop-types";

import validate from "validate.js";

import { withStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
  IconButton,
  Hidden,
  Grid,
  Button,
  Divider,
  TextField,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

import AuthProviderList from "../AuthProviderList";

import constraints from "../../data/constraints";
import authentication from "../../services/authentication";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  icon: {
    marginRight: theme.spacing(0.5),
  },

  divider: {
    margin: "auto",
  },

  grid: {
    marginBottom: theme.spacing(2),
  },
});

const initialState = {
  performingAction: false,
  emailAddress: "",
  emailAddressConfirmation: "",
  password: "",
  passwordConfirmation: "",
  errors: null,
};

class SignUpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  signUp = () => {
    const {
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation,
    } = this.state;

    const errors = validate(
      {
        emailAddress: emailAddress,
        emailAddressConfirmation: emailAddressConfirmation,
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
      {
        emailAddress: constraints.emailAddress,
        emailAddressConfirmation: constraints.emailAddressConfirmation,
        password: constraints.password,
        passwordConfirmation: constraints.passwordConfirmation,
      }
    );

    if (errors) {
      this.setState({
        errors: errors,
      });
    } else {
      this.setState(
        {
          performingAction: true,
          errors: null,
        },
        () => {
          authentication
            .signUpWithEmailAddressAndPassword(emailAddress, password)
            .then((value) => {
              this.props.dialogProps.onClose();
            })
            .catch((reason) => {
              const code = reason.code;
              const message = reason.message;

              switch (code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                case "auth/operation-not-allowed":
                case "auth/weak-password":
                  this.props.openSnackbar(message);
                  return;

                default:
                  this.props.openSnackbar(message);
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
    }
  };

  signInWithAuthProvider = (provider) => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .signInWithAuthProvider(provider)
          .then((user) => {
            this.props.dialogProps.onClose(() => {
              const displayName = user.displayName;
              const emailAddress = user.email;

              this.props.openSnackbar(
                `Signed in as ${displayName || emailAddress}`
              );
            });
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              case "auth/account-exists-with-different-credential":
              case "auth/auth-domain-config-required":
              case "auth/cancelled-popup-request":
              case "auth/operation-not-allowed":
              case "auth/operation-not-supported-in-this-environment":
              case "auth/popup-blocked":
              case "auth/popup-closed-by-user":
              case "auth/unauthorized-domain":
                this.props.openSnackbar(message);
                return;

              default:
                this.props.openSnackbar(message);
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

  handleKeyPress = (event) => {
    const {
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation,
    } = this.state;

    if (
      !emailAddress ||
      !emailAddressConfirmation ||
      !password ||
      !passwordConfirmation
    ) {
      return;
    }

    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === "Enter") {
      this.signUp();
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress,
    });
  };

  handleEmailAddressConfirmationChange = (event) => {
    const emailAddressConfirmation = event.target.value;

    this.setState({
      emailAddressConfirmation: emailAddressConfirmation,
    });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({
      password: password,
    });
  };

  handlePasswordConfirmationChange = (event) => {
    const passwordConfirmation = event.target.value;

    this.setState({
      passwordConfirmation: passwordConfirmation,
    });
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    const {
      performingAction,
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation,
      errors,
    } = this.state;

    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        disableBackdropClick={performingAction}
        disableEscapeKeyDown={performingAction}
        {...dialogProps}
        onKeyPress={this.handleKeyPress}
        onExited={this.handleExited}
      >
        <DialogTitle disableTypography>
          <Typography variant="h6">Sign up for an account</Typography>

          <Tooltip title="Close">
            <IconButton
              className={classes.closeButton}
              disabled={performingAction}
              onClick={dialogProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <Hidden xsDown>
          <DialogContent>
            <Grid container direction="row">
              <Grid item xs={4}>
                <AuthProviderList
                  performingAction={performingAction}
                  onAuthProviderClick={this.signInWithAuthProvider}
                />
              </Grid>

              <Grid item xs={1}>
                <Divider className={classes.divider} orientation="vertical" />
              </Grid>

              <Grid item xs={7}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs>
                    <TextField
                      autoComplete="email"
                      disabled={performingAction}
                      error={!!(errors && errors.emailAddress)}
                      fullWidth
                      helperText={
                        errors && errors.emailAddress
                          ? errors.emailAddress[0]
                          : ""
                      }
                      label="E-mail address"
                      placeholder="john@doe.com"
                      required
                      type="email"
                      value={emailAddress}
                      variant="outlined"
                      InputLabelProps={{ required: false }}
                      onChange={this.handleEmailAddressChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="email"
                      disabled={performingAction}
                      error={!!(errors && errors.emailAddressConfirmation)}
                      fullWidth
                      helperText={
                        errors && errors.emailAddressConfirmation
                          ? errors.emailAddressConfirmation[0]
                          : ""
                      }
                      label="E-mail address confirmation"
                      placeholder="john@doe.com"
                      required
                      type="email"
                      value={emailAddressConfirmation}
                      variant="outlined"
                      InputLabelProps={{ required: false }}
                      onChange={this.handleEmailAddressConfirmationChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="new-password"
                      disabled={performingAction}
                      error={!!(errors && errors.password)}
                      fullWidth
                      helperText={
                        errors && errors.password ? errors.password[0] : ""
                      }
                      label="Password"
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      required
                      type="password"
                      value={password}
                      variant="outlined"
                      InputLabelProps={{ required: false }}
                      onChange={this.handlePasswordChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="password"
                      disabled={performingAction}
                      error={!!(errors && errors.passwordConfirmation)}
                      fullWidth
                      helperText={
                        errors && errors.passwordConfirmation
                          ? errors.passwordConfirmation[0]
                          : ""
                      }
                      label="Password confirmation"
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      required
                      type="password"
                      value={passwordConfirmation}
                      variant="outlined"
                      InputLabelProps={{ required: false }}
                      onChange={this.handlePasswordConfirmationChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Hidden>

        <Hidden smUp>
          <DialogContent>
            <AuthProviderList
              gutterBottom
              performingAction={performingAction}
              onAuthProviderClick={this.signInWithAuthProvider}
            />

            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  autoComplete="email"
                  disabled={performingAction}
                  error={!!(errors && errors.emailAddress)}
                  fullWidth
                  helperText={
                    errors && errors.emailAddress ? errors.emailAddress[0] : ""
                  }
                  label="E-mail address"
                  placeholder="john@doe.com"
                  required
                  type="email"
                  value={emailAddress}
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  onChange={this.handleEmailAddressChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="email"
                  disabled={performingAction}
                  error={!!(errors && errors.emailAddressConfirmation)}
                  fullWidth
                  helperText={
                    errors && errors.emailAddressConfirmation
                      ? errors.emailAddressConfirmation[0]
                      : ""
                  }
                  label="E-mail address confirmation"
                  placeholder="john@doe.com"
                  required
                  type="email"
                  value={emailAddressConfirmation}
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  onChange={this.handleEmailAddressConfirmationChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="new-password"
                  disabled={performingAction}
                  error={!!(errors && errors.password)}
                  fullWidth
                  helperText={
                    errors && errors.password ? errors.password[0] : ""
                  }
                  label="Password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  required
                  type="password"
                  value={password}
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  onChange={this.handlePasswordChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="password"
                  disabled={performingAction}
                  error={!!(errors && errors.passwordConfirmation)}
                  fullWidth
                  helperText={
                    errors && errors.passwordConfirmation
                      ? errors.passwordConfirmation[0]
                      : ""
                  }
                  label="Password confirmation"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  required
                  type="password"
                  value={passwordConfirmation}
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  onChange={this.handlePasswordConfirmationChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Hidden>

        <DialogActions>
          <Button
            color="primary"
            disabled={
              !emailAddress ||
              !emailAddressConfirmation ||
              !password ||
              !passwordConfirmation ||
              performingAction
            }
            variant="contained"
            onClick={this.signUp}
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignUpDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignUpDialog);
