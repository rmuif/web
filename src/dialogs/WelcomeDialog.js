import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

class WelcomeDialog extends Component {
  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.onOkClick();
    }
  };

  render() {
    // Dialog Properties
    const { fullScreen, open } = this.props;

    // Custom Properties
    const { title, isPerformingAuthAction } = this.props;

    // Dialog Events
    const { onClose } = this.props;

    // Custom Events
    const { onCancelClick, onVerifyClick } = this.props;

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        <DialogTitle>
          Welcome to {title}!
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Complete your account by verifying your e-mail address.
            An e-mail will be sent to your e-mail address containing instructions on how to verify your e-mail address.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={onCancelClick}>Cancel</Button>
          <Button color="primary" disabled={isPerformingAuthAction} variant="contained" onClick={onVerifyClick}>Verify</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WelcomeDialog.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,

  title: PropTypes.string.isRequired,
  isPerformingAuthAction: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  onCancelClick: PropTypes.func.isRequired,
  onVerifyClick: PropTypes.func.isRequired
};

export default WelcomeDialog;