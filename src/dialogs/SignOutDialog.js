import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

class SignOutDialog extends Component {
  render() {
    // Properties
    const { open } = this.props;

    // Methods
    const { signOut } = this.props;

    // Events
    const { onClose } = this.props;

    return (
      <Dialog open={open}>
        <DialogTitle>
          Sign out?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            While signed out you are unable to manage your profile and conduct other activities that require you to be signed in. Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={signOut}>Sign out</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignOutDialog;