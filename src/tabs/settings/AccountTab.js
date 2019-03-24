import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import DialogContentText from '@material-ui/core/DialogContentText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import EmailIcon from '@material-ui/icons/Email';

const styles = (theme) => ({
  dialogContentText: {
    marginTop: `${theme.spacing.unit * 2}px`
  }
});

class AccountTab extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <DialogContentText className={classes.dialogContentText}>
          This is a summary of your account.
          You can manage your account throughout all the settings.
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>

            <ListItemText primary={user.email} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(AccountTab);