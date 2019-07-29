import React, { Component } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import AuthProviderList from '../../layout/AuthProviderList/AuthProviderList';

import constraints from '../../constraints';
import * as auth from '../../auth';

const styles = (theme) => ({
  dialogContent: {
    overflowY: 'hidden'
  },

  icon: {
    marginRight: theme.spacing(0.5)
  },

  divider: {
    margin: 'auto',

    width: theme.spacing(0.125),
    height: '100%'
  },

  grid: {
    marginBottom: theme.spacing(2)
  }
});

const initialState = {
  isPerformingAuthAction: false,

  firstName: '',
  lastName: '',
  username: '',
  emailAddress: '',
  emailAddressConfirmation: '',
  password: '',
  passwordConfirmation: '',

  errors: null
};

class SignUpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  signUp = () => {
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation
    } = this.state;

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
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        isPerformingAuthAction: true,

        errors: null
      }, () => {
        auth.signUp({
          firstName: firstName,
          lastName: lastName,
          username: username,
          emailAddress: emailAddress,
          password: password
        }).then((value) => {
          this.props.dialogProps.onClose();
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;
  
          switch (code) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
            case 'auth/operation-not-allowed':
            case 'auth/weak-password':
              this.props.openSnackbar(message);
              return;
  
            default:
              this.props.openSnackbar(message);
              return;
          }
        });
      });
    }
  };

  signInWithAuthProvider = (providerId) => {
    this.setState({
      isPerformingAuthAction: true
    }, () => {
      auth.signInWithAuthProvider(providerId).then((value) => {
        this.props.dialogProps.onClose(() => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(`Signed in as ${displayName || emailAddress}`);
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
            this.props.openSnackbar(message);
            return;

          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          isPerformingAuthAction: false
        });
      });
    });
  };

  handleKeyPress = (event) => {
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation
    } = this.state;

    if (!firstName ||
      !lastName ||
      !username ||
      !emailAddress ||
      !emailAddressConfirmation ||
      !password ||
      !passwordConfirmation) {
      return;
    }

    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.signUp();
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleFirstNameChange = (event) => {
    const firstName = event.target.value;

    this.setState({
      firstName: firstName
    });
  };

  handleLastNameChange = (event) => {
    const lastName = event.target.value;

    this.setState({
      lastName: lastName
    });
  };

  handleUsernameChange = (event) => {
    const username = event.target.value;

    this.setState({
      username: username
    });
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress
    });
  };

  handleEmailAddressConfirmationChange = (event) => {
    const emailAddressConfirmation = event.target.value;

    this.setState({
      emailAddressConfirmation: emailAddressConfirmation
    });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({
      password: password
    });
  };

  handlePasswordConfirmationChange = (event) => {
    const passwordConfirmation = event.target.value;

    this.setState({
      passwordConfirmation: passwordConfirmation
    });
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    const {
      isPerformingAuthAction,

      firstName,
      lastName,
      username,
      emailAddress,
      emailAddressConfirmation,
      password,
      passwordConfirmation,

      errors
    } = this.state;

    return (
      <Dialog fullWidth maxWidth="md" {...dialogProps} onKeyPress={this.handleKeyPress} onExited={this.handleExited}>
        <DialogTitle>
          Sign up for an account
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <Hidden smDown>
            <Grid container direction="row">
              <Grid item xs={3}>
                <AuthProviderList
                  isPerformingAuthAction={isPerformingAuthAction}

                  onAuthProviderClick={this.signInWithAuthProvider}
                />
              </Grid>

              <Grid item xs={1}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={8}>
                <Grid container spacing={4}>
                  <Grid item xs>
                    <TextField
                      autoComplete="given-name"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.firstName)}
                      fullWidth
                      helperText={(errors && errors.firstName) ? errors.firstName[0] : ''}
                      label="First name"
                      placeholder="John"
                      required
                      type="text"
                      value={firstName}
                      variant="outlined"

                      onChange={this.handleFirstNameChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="family-name"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.lastName)}
                      fullWidth
                      helperText={(errors && errors.lastName) ? errors.lastName[0] : ''}
                      label="Last name"
                      placeholder="Doe"
                      required
                      type="text"
                      value={lastName}
                      variant="outlined"

                      onChange={this.handleLastNameChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs>
                    <TextField
                      autoComplete="username"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.username)}
                      fullWidth
                      helperText={(errors && errors.username) ? errors.username[0] : ''}
                      label="Username"
                      placeholder="John"
                      required
                      type="text"
                      value={username}
                      variant="outlined"

                      onChange={this.handleUsernameChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs>
                    <TextField
                      autoComplete="email"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.emailAddress)}
                      fullWidth
                      helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                      label="E-mail address"
                      placeholder="john@doe.com"
                      required
                      type="email"
                      value={emailAddress}
                      variant="outlined"

                      onChange={this.handleEmailAddressChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="email"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.emailAddressConfirmation)}
                      fullWidth
                      helperText={(errors && errors.emailAddressConfirmation) ? errors.emailAddressConfirmation[0] : ''}
                      label="E-mail address confirmation"
                      placeholder="john@doe.com"
                      required
                      type="email"
                      value={emailAddressConfirmation}
                      variant="outlined"

                      onChange={this.handleEmailAddressConfirmationChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs>
                    <TextField
                      autoComplete="new-password"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.password)}
                      fullWidth
                      helperText={(errors && errors.password) ? errors.password[0] : ''}
                      label="Password"
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      required
                      type="password"
                      value={password}
                      variant="outlined"

                      onChange={this.handlePasswordChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="password"
                      disabled={isPerformingAuthAction}
                      error={!!(errors && errors.passwordConfirmation)}
                      fullWidth
                      helperText={(errors && errors.passwordConfirmation) ? errors.passwordConfirmation[0] : ''}
                      label="Password confirmation"
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      required
                      type="password"
                      value={passwordConfirmation}
                      variant="outlined"

                      onChange={this.handlePasswordConfirmationChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <AuthProviderList
              gutterBottom
              isPerformingAuthAction={isPerformingAuthAction}

              onAuthProviderClick={this.signInWithAuthProvider}
            />

            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  autoComplete="given-name"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.firstName)}
                  fullWidth
                  helperText={(errors && errors.firstName) ? errors.firstName[0] : ''}
                  label="First name"
                  placeholder="John"
                  required
                  type="text"
                  value={firstName}
                  variant="outlined"

                  onChange={this.handleFirstNameChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="family-name"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.lastName)}
                  fullWidth
                  helperText={(errors && errors.lastName) ? errors.lastName[0] : ''}
                  label="Last name"
                  placeholder="Doe"
                  required
                  type="text"
                  value={lastName}
                  variant="outlined"

                  onChange={this.handleLastNameChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="username"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.username)}
                  fullWidth
                  helperText={(errors && errors.username) ? errors.username[0] : ''}
                  label="Username"
                  placeholder="John"
                  required
                  type="text"
                  value={username}
                  variant="outlined"

                  onChange={this.handleUsernameChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="email"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.emailAddress)}
                  fullWidth
                  helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                  label="E-mail address"
                  placeholder="john@doe.com"
                  required
                  type="email"
                  value={emailAddress}
                  variant="outlined"

                  onChange={this.handleEmailAddressChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="email"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.emailAddressConfirmation)}
                  fullWidth
                  helperText={(errors && errors.emailAddressConfirmation) ? errors.emailAddressConfirmation[0] : ''}
                  label="E-mail address confirmation"
                  placeholder="john@doe.com"
                  required
                  type="email"
                  value={emailAddressConfirmation}
                  variant="outlined"

                  onChange={this.handleEmailAddressConfirmationChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="new-password"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.password)}
                  fullWidth
                  helperText={(errors && errors.password) ? errors.password[0] : ''}
                  label="Password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  required
                  type="password"
                  value={password}
                  variant="outlined"

                  onChange={this.handlePasswordChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="password"
                  disabled={isPerformingAuthAction}
                  error={!!(errors && errors.passwordConfirmation)}
                  fullWidth
                  helperText={(errors && errors.passwordConfirmation) ? errors.passwordConfirmation[0] : ''}
                  label="Password confirmation"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  required
                  type="password"
                  value={passwordConfirmation}
                  variant="outlined"

                  onChange={this.handlePasswordConfirmationChange}
                />
              </Grid>
            </Grid>
          </Hidden>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={dialogProps.onClose}>Cancel</Button>

          <Button
            color="primary"
            disabled={
              !firstName ||
              !lastName ||
              !username ||
              !emailAddress ||
              !emailAddressConfirmation ||
              !password ||
              !passwordConfirmation ||
              isPerformingAuthAction
            }
            variant="contained"

            onClick={this.signUp}>
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
  openSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUpDialog);