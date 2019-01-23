import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

class SignOutDialog extends Component {
  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.signOut();
    }
  };

  render() {
    // Properties
    const { open } = this.props;

    // Methods
    const { signOut } = this.props;

    // Events
    const { onClose } = this.props;

    return (
      <Dialog open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Sign out?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={signOut}>Sign Out</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SignOutDialog;