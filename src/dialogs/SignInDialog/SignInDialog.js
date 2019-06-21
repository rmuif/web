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

const styles = (theme) => ({
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
  emailAddress: '',
  password: '',

  errors: null
};

class SignInDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetPassword = () => {
    const { emailAddress } = this.state;

    const errors = validate({
      emailAddress: emailAddress
    }, {
      emailAddress: constraints.emailAddress
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.resetPassword(emailAddress);
      });
    }
  };

  signIn = () => {
    const { emailAddress, password } = this.state;

    const errors = validate({
      emailAddress: emailAddress,
      password: password
    }, {
      emailAddress: constraints.emailAddress,
      password: constraints.password
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: errors
      }, () => {
        this.props.signIn(emailAddress, password);
      });
    }
  };

  handleKeyPress = (event) => {
    const { emailAddress, password } = this.state;

    if (!emailAddress || !password) {
      return;
    }

    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.signIn();
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress
    });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({
      password: password
    });
  };

  render() {

    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { isPerformingAuthAction } = this.props;

    // Custom Events
    const { onAuthProviderClick } = this.props;

    const { emailAddress, password, errors } = this.state;

    return (
      <Dialog fullWidth maxWidth="sm" {...dialogProps} onKeyPress={this.handleKeyPress} onExited={this.handleExited}>
        <DialogTitle>
          Sign in to your account
        </DialogTitle>

        <DialogContent>
          <Hidden xsDown>
            <Grid container direction="row">
              <Grid item xs={4}>
                <AuthProviderList
                  isPerformingAuthAction={isPerformingAuthAction}

                  onAuthProviderClick={onAuthProviderClick}
                />
              </Grid>

              <Grid item xs={1}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={7}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs>
                    <TextField
                      autoComplete="email"
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
                      autoComplete="current-password"
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
                </Grid>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <AuthProviderList
              gutterBottom
              isPerformingAuthAction={isPerformingAuthAction}

              onAuthProviderClick={onAuthProviderClick}
            />

            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  autoComplete="email"
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
                  autoComplete="current-password"
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
            </Grid>
          </Hidden>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={dialogProps.onClose}>Cancel</Button>

          <Button
            color="primary"
            disabled={!emailAddress || isPerformingAuthAction}
            variant="outlined"

            onClick={this.resetPassword}>
            Reset password
          </Button>

          <Button
            color="primary"
            disabled={(!emailAddress || !password) || isPerformingAuthAction}
            variant="contained"

            onClick={this.signIn}>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = {

  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  isPerformingAuthAction: PropTypes.bool,

  // Custom Functions
  resetPassword: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,

  // Custom Events
  onAuthProviderClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SignInDialog);