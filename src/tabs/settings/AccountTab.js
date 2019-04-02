import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import DialogContentText from '@material-ui/core/DialogContentText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import EmailIcon from '@material-ui/icons/Email';
import CheckIcon from '@material-ui/icons/Check';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const styles = (theme) => ({
  dialogContentText: {
    marginTop: `${theme.spacing.unit * 2}px`
  }
});

class AccountTab extends Component {
  render() {
    // Properties
    const { classes, user } = this.props;

    // Events
    const { onVerifyEmailAddressClick } = this.props;

    return (
      <div>
        <DialogContentText className={classes.dialogContentText}>
          This is a summary of your account.
          You can manage your account throughout all the settings.
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemIcon>
              <Tooltip title="E-mail address">
                <EmailIcon />
              </Tooltip>
            </ListItemIcon>

            <ListItemText primary={user.email} secondary={user.emailVerified ? 'Verified' : 'Not verified'} />

            {!user.emailVerified &&
              <ListItemSecondaryAction>
                <Tooltip title="Verify e-mail address">
                  <IconButton onClick={onVerifyEmailAddressClick}>
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            }
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Tooltip title="Last sign-in time">
                <AccessTimeIcon />
              </Tooltip>
            </ListItemIcon>

            <ListItemText primary={user.metadata.lastSignInTime} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Tooltip title="Creation time">
                <AccessTimeIcon />
              </Tooltip>
            </ListItemIcon>

            <ListItemText primary={user.metadata.creationTime} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(AccountTab);