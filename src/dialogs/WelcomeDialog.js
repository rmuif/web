import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Profile from '../layout/Profile';

const styles = (theme) => ({
  title: {
    marginTop: `${theme.spacing.unit * 3}px`
  },

  contentText: {
    marginTop: `${theme.spacing.unit * 2}px`
  }
});

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
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { fullScreen, open } = this.props;

    // Custom Properties
    const { title, user, isPerformingAuthAction } = this.props;

    // Dialog Events
    const { onClose } = this.props;

    // Custom Events
    const { onCancelClick, onVerifyClick } = this.props;

    const isUserComplete = (user.photoURL && user.displayName && user.email);

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} onKeyPress={this.handleKeyPress}>
        {isUserComplete &&
          <DialogContent>
            <Profile user={user} />

            <Typography className={classes.title} variant="h6">Welcome to {title}!</Typography>

            <DialogContentText className={classes.contentText}>
              Complete your account by verifying your e-mail address.
              An e-mail will be sent to your e-mail address containing instructions on how to verify your e-mail address.
            </DialogContentText>
          </DialogContent>
        }

        {!isUserComplete &&
          <React.Fragment>
            <DialogTitle>
              Welcome to {title}!
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Complete your account by verifying your e-mail address.
                An e-mail will be sent to your e-mail address containing instructions on how to verify your e-mail address.
              </DialogContentText>
            </DialogContent>
          </React.Fragment>
        }

        <DialogActions>
          <Button color="primary" onClick={onCancelClick}>Cancel</Button>
          <Button color="primary" disabled={isPerformingAuthAction} variant="contained" onClick={onVerifyClick}>Verify</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WelcomeDialog.propTypes = {
  classes: PropTypes.object.isRequired,

  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,

  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isPerformingAuthAction: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  onCancelClick: PropTypes.func,
  onVerifyClick: PropTypes.func
};

export default withStyles(styles)(WelcomeDialog);