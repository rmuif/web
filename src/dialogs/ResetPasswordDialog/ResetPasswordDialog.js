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

const initialState = {
  emailAddress: '',

  errors: null
};

class ResetPasswordDialog extends Component {
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
      this.setState({ errors });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.resetPassword(emailAddress);
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
      event.preventDefault();

      this.resetPassword();
    }
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({ emailAddress });
  };

  handleResetPasswordClick = () => {
    this.resetPassword();
  };

  render() {
    // Properties
    const { open, isPerformingAuthAction } = this.props;

    // Events
    const { onClose } = this.props;

    const { emailAddress, errors } = this.state;

    return (
      <Dialog open={open} onClose={onClose} onExited={this.handleExited} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Reset your password
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            An e-mail will be sent to your e-mail address containing instructions on how to reset your password.
          </DialogContentText>

          <form>
            <TextField
              autoComplete="email"
              autoFocus
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
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" disabled={!emailAddress || isPerformingAuthAction} variant="contained" onClick={this.handleResetPasswordClick}>Reset Password</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ResetPasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,

  isPerformingAuthAction: PropTypes.bool.isRequired,

  resetPassword: PropTypes.func.isRequired,

  onClose: PropTypes.func.isRequired
};

export default ResetPasswordDialog;