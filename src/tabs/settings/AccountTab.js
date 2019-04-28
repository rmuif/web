import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import DialogContentText from '@material-ui/core/DialogContentText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import PortraitIcon from '@material-ui/icons/Portrait';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ConfirmationDialog from '../../dialogs/ConfirmationDialog';

const styles = (theme) => ({
  profile: {
    marginTop: `${theme.spacing.unit * 2}px`,
    textAlign: 'center'
  },

  avatar: {
    width: `${theme.spacing.unit * 12}px`,
    height: `${theme.spacing.unit * 12}px`,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  info: {
    marginTop: `${theme.spacing.unit * 0.5}px`
  },

  emailAddress: {
    marginTop: `-${theme.spacing.unit * 0.5}px`
  },

  dialogContentTextComplete: {
    marginTop: `${theme.spacing.unit}px`
  },

  dialogContentTextIncomplete: {
    marginTop: `${theme.spacing.unit * 2}px`
  }
});

class AccountTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifyEmailAddressDialog: {
        open: false
      }
    };
  }

  openVerifyEmailAddressDialog = () => {
    this.setState({
      verifyEmailAddressDialog: {
        open: true
      }
    });
  };

  closeVerifyEmailAddressDialog = (callback) => {
    this.setState({
      verifyEmailAddressDialog: {
        open: false
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  verifyEmailAddress = () => {
    this.closeVerifyEmailAddressDialog(() => {
      this.props.onVerifyEmailAddressClick();
    });
  };

  render() {
    // Properties
    const { classes, user, isPerformingAuthAction } = this.props;

    // Events
    const { onChangeDisplayNameClick } = this.props;

    const { verifyEmailAddressDialog } = this.state;

    const isUserComplete = (user.photoURL && user.displayName && user.email);

    return (
      <React.Fragment>
        {isUserComplete &&
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt="Avatar" src={user.photoURL} />

            <div className={classes.info}>
              <Typography variant="h6">{user.displayName}</Typography>
              <Typography className={classes.emailAddress} color="textSecondary" variant="body1">{user.email}</Typography>
            </div>
          </div>
        }

        <DialogContentText className={isUserComplete ? classes.dialogContentTextComplete : classes.dialogContentTextIncomplete}>
          Here's some info about your account. You can manage your account through the tabs.
        </DialogContentText>

        <List>
          {!user.photoURL &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Avatar">
                  <PortraitIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="You don't have an avatar. Add one!" />

              <ListItemSecondaryAction>
                <Button color="primary" variant="contained">Add</Button>
              </ListItemSecondaryAction>
            </ListItem>
          }

          {user.displayName &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Display name">
                  <PersonIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="Display name" secondary={user.displayName} />

              <ListItemSecondaryAction>
                <Tooltip title="Edit">
                  <IconButton onClick={onChangeDisplayNameClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          }

          {!user.displayName &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Display name">
                  <PersonIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="You don't have a display name. Add one!" />

              <ListItemSecondaryAction>
                <Button color="primary" variant="contained">Add</Button>
              </ListItemSecondaryAction>
            </ListItem>
          }

          {user.email &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="E-mail address">
                  <EmailIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary={user.email} secondary={user.emailVerified ? 'Verified' : 'Not verified'} />

              {!user.emailVerified &&
                <ListItemSecondaryAction>
                  <Button color="primary" disabled={isPerformingAuthAction} variant="contained" onClick={this.openVerifyEmailAddressDialog}>Verify</Button>
                </ListItemSecondaryAction>
              }
            </ListItem>
          }

          {!user.email &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="E-mail address">
                  <EmailIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="You don't have an e-mail address. Add one!" />

              <ListItemSecondaryAction>
                <Button color="primary" variant="contained">Add</Button>
              </ListItemSecondaryAction>
            </ListItem>
          }

          {user.metadata.lastSignInTime &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Last sign-in">
                  <AccessTimeIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="Last sign-in" secondary={moment(user.metadata.lastSignInTime).format('LLLL')} />
            </ListItem>
          }

          {user.metadata.creationTime &&
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Signed up">
                  <AccessTimeIcon />
                </Tooltip>
              </ListItemIcon>

              <ListItemText primary="Signed up" secondary={moment(user.metadata.creationTime).format('LLLL')} />
            </ListItem>
          }
        </List>

        <ConfirmationDialog
          open={verifyEmailAddressDialog.open}

          title="Send verification e-mail?"
          contentText="An e-mail will be sent to your e-mail address containing instructions on how to verify your e-mail address."
          okText="Send"
          highlightOkButton

          onClose={this.closeVerifyEmailAddressDialog}

          onCancelClick={this.closeVerifyEmailAddressDialog}
          onOkClick={this.verifyEmailAddress}
        />
      </React.Fragment>
    );
  }
}

AccountTab.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isPerformingAuthAction: PropTypes.bool.isRequired,

  onVerifyEmailAddressClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AccountTab);