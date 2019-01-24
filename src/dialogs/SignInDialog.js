import React, { Component } from 'react';

import validate from 'validate.js';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    const constraints = {
      emailAddress: {
        email: true,
        presence: {
          allowEmpty: false
        }
      },
      
      password: {
        length: {
          minimum: 6
        },
        presence: {
          allowEmpty: false
        }
      }
    };

    const { emailAddress, password } = this.state;
    
    const errors = validate({ emailAddress, password }, constraints);

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
    const { open, isSigningIn } = this.props;

    // Events
    const { onClose, onResetPasswordClick } = this.props;

    const { emailAddress, password, errors } = this.state;

    return (
      <Dialog open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Sign in to your account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Some features might be unavailable until you sign in.
            While you're signed in you can manage your account.
          </DialogContentText>

          <div>
            <form>
              <TextField
                autoComplete="email"
                autoFocus
                error={(errors && errors.emailAddress) ? true : false}
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
                error={(errors && errors.password) ? true : false}
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
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" variant="outlined" onClick={onResetPasswordClick}>Reset Password</Button>
          <Button color="primary" disabled={(!emailAddress || !password) || isSigningIn} variant="contained" onClick={this.handleSignInClick}>Sign In</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignInDialog;