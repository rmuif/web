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
  passwordConfirmation: '',

  errors: null
};

class SignUpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  signUp = () => {
    const { emailAddress, password, passwordConfirmation } = this.state;
    
    const errors = validate({
      emailAddress: emailAddress,
      password: password,
      passwordConfirmation: passwordConfirmation
    }, {
      emailAddress: constraints.emailAddress,
      password: constraints.password,
      passwordConfirmation: constraints.passwordConfirmation
    });

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.signUp(emailAddress, password, passwordConfirmation);
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
      this.signUp();
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

  handlePasswordConfirmationChange = (event) => {
    const passwordConfirmation = event.target.value;

    this.setState({ passwordConfirmation });
  };

  handleSignUpClick = () => {
    this.signUp();
  };

  render() {
    // Properties
    const { fullScreen, open, isPerformingAuthAction } = this.props;

    // Events
    const { onClose, onAuthProviderClick } = this.props;

    const { emailAddress, password, passwordConfirmation, errors } = this.state;

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Sign up for an account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Create an account to access features that are unavailable to users who haven't signed up.
          </DialogContentText>

          <AuthProviderList isPerformingAuthAction={isPerformingAuthAction} onAuthProviderClick={onAuthProviderClick} />

          <form>
            <TextField
              autoComplete="email"
              error={!!(errors && errors.emailAddress)}
              fullWidth
              helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
              label="E-mail address"
              margin="normal"
              onChange={this.handleEmailAddressChange}
              required
              type="email"
              value={emailAddress}
            />

            <TextField
              autoComplete="new-password"
              error={!!(errors && errors.password)}
              fullWidth
              helperText={(errors && errors.password) ? errors.password[0] : ''}
              label="Password"
              margin="normal"
              onChange={this.handlePasswordChange}
              required
              type="password"
              value={password}
            />

            <TextField
              autoComplete="password"
              error={!!(errors && errors.passwordConfirmation)}
              fullWidth
              helperText={(errors && errors.passwordConfirmation) ? errors.passwordConfirmation[0] : ''}
              label="Password confirmation"
              margin="normal"
              onChange={this.handlePasswordConfirmationChange}
              required
              type="password"
              value={passwordConfirmation}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" disabled={(!emailAddress || !password || !passwordConfirmation) || isPerformingAuthAction} variant="contained" onClick={this.handleSignUpClick}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignUpDialog.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,

  isPerformingAuthAction: PropTypes.bool.isRequired,

  signUp: PropTypes.func.isRequired,

  onClose: PropTypes.func.isRequired,
  onAuthProviderClick: PropTypes.func.isRequired
};

export default SignUpDialog;