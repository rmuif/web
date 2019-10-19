import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialState = {
  username: ''
};

class DeleteAccountDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleKeyPress = (event) => {
    const { username } = this.state;

    if (!username) {
      return;
    }

    const { userData } = this.props;

    if (!userData) {
      return;
    }

    if (username !== userData.username) {
      return;
    }

    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.props.deleteAccount();
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleUsernameChange = (event) => {
    const username = event.target.value;

    this.setState({
      username: username
    });
  };

  render() {
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { performingAction, userData } = this.props;

    // Custom Functions
    const { deleteAccount } = this.props;

    const { username } = this.state;

    return (
      <Dialog {...dialogProps} onKeyPress={this.handleKeyPress} onExited={this.handleExited}>
        <DialogTitle>
          Delete account?
        </DialogTitle>

        <DialogContent>
          <Box mb={3}>
            <DialogContentText>
              Deleted accounts can’t be recovered.
              All data associated with your account will be deleted.
            </DialogContentText>

            <DialogContentText>
              Type your username and <Hidden xsDown>click</Hidden><Hidden smUp>tap</Hidden> Delete to delete your account.
              This action is irreversible.
            </DialogContentText>
          </Box>

          <TextField
            autoComplete="username"
            disabled={performingAction}
            fullWidth
            label="Username"
            placeholder={userData.username}
            required
            type="text"
            value={username}
            variant="outlined"

            onChange={this.handleUsernameChange}
          />
        </DialogContent>

        <DialogActions>
          <Button color="secondary" disabled={performingAction} onClick={dialogProps.onClose}>Cancel</Button>
          <Button color="secondary" disabled={performingAction || (username !== userData.username)} variant="contained" onClick={deleteAccount}>Delete</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteAccountDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  performingAction: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,

  // Custom Functions
  deleteAccount: PropTypes.func.isRequired
};

export default DeleteAccountDialog;
