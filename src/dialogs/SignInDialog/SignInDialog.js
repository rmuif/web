import React, { Component } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import constraints from '../../constraints';

import AuthProviderList from '../../layout/AuthProviderList/AuthProviderList';

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
      this.setState({ errors });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.signIn(emailAddress, password);
      });
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.signIn();
    }
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({ emailAddress });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({ password });
  };

  handleSignInClick = () => {
    this.signIn();
  };

  render() {
    // Properties
    const { fullScreen, open, isPerformingAuthAction } = this.props;

    // Events
    const { onClose, onAuthProviderClick, onResetPasswordClick } = this.props;

    const { emailAddress, password, errors } = this.state;

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Sign in to your account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Some features might be unavailable until you sign in.
            While you're signed in you can manage your account.
          </DialogContentText>

          <AuthProviderList isPerformingAuthAction={isPerformingAuthAction} onAuthProviderClick={onAuthProviderClick} />

          <form>
            <TextField
              autoComplete="email"
              error={!!(errors && errors.emailAddress)}
              fullWidth
              helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
              margin="normal"
              onChange={this.handleEmailAddressChange}
              placeholder="E-mail address"
              required
              type="email"
              value={emailAddress}
            />

            <TextField
              autoComplete="current-password"
              error={!!(errors && errors.password)}
              fullWidth
              helperText={(errors && errors.password) ? errors.password[0] : ''}
              margin="normal"
              onChange={this.handlePasswordChange}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" disabled={isPerformingAuthAction} variant="outlined" onClick={onResetPasswordClick}>Reset Password</Button>
          <Button color="primary" disabled={(!emailAddress || !password) || isPerformingAuthAction} variant="contained" onClick={this.handleSignInClick}>Sign In</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,

  isPerformingAuthAction: PropTypes.bool.isRequired,

  signIn: PropTypes.func.isRequired,

  onClose: PropTypes.func.isRequired,
  onAuthProviderClick: PropTypes.func.isRequired,
  onResetPasswordClick: PropTypes.func.isRequired
};

export default SignInDialog;