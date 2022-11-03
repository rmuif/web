import React, { useState } from "react"; 

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Hidden, 
  Box, 
  TextField, 
  Button, 
} from "@material-ui/core"; 

const initialState = {
  username: "", 
} 

function DeleteAccountDialog() {

  const [initialState, setInitialState] = useState(""); 

  const handleKeyPress = event => {
    const { userData } = this.props; 

    if (userData && userData.username) {
      const { username } = this.state; 

      if (!username) {
        return; 
      }

      if (username !== userData.username) {
        return; 
      }
    }

    const key = event.key; 

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return; 
    } 

    if (key === "Enter") {
      this.props.deleteAccount(); 
    }
  }

  const handleExited = () => {
    setInitialState(initialState); 
  }

  const handleUsernameChange = event => {
    const username = event.target.value; 

    this.setState({
      username: username, 
    })
  }

  const { dialogProps } = this.props; 

  const { performingAction, userData } = this.props; 

  const { deleteAccount } = this.props; 

  const { username } = this.state; 

  const hasUsername = userData && userData.username; 

  return (
    <Dialog
        {...dialogProps}
        onKeyPress={this.handleKeyPress}
        onExited={this.handleExited}
      >
        <DialogTitle>Delete account?</DialogTitle>

        <DialogContent>
          <Box mb={hasUsername ? 2 : 0}>
            <DialogContentText>
              Deleted accounts can’t be recovered. All data associated with your
              account will be deleted.
            </DialogContentText>

            {hasUsername && (
              <DialogContentText>
                Type your username and <Hidden xsDown>click</Hidden>
                <Hidden smUp>tap</Hidden> Delete to delete your account. This
                action is irreversible.
              </DialogContentText>
            )}
          </Box>

          {hasUsername && (
            <TextField
              autoComplete="username"
              autoFocus
              color="secondary"
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
          )}
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            disabled={performingAction}
            onClick={dialogProps.onClose}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            disabled={
              performingAction ||
              (hasUsername && username !== userData.username)
            }
            variant="contained"
            onClick={deleteAccount}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteAccountDialog; 
