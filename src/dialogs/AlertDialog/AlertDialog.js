import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';

const styles = (theme) => ({
  noTitlePadding: {
    paddingTop: theme.spacing(3)
  }
});

// Alert dialogs interrupt users with urgent information, details, or actions.
class AlertDialog extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { fullScreen, open } = this.props;

    // Custom Properties
    const {
      title,
      contentText,
      dismissiveActionText,
      confirmingActionText,
      acknowledgementActionText
    } = this.props;

    // Dialog Events
    const { onClose } = this.props;

    if ((dismissiveActionText || confirmingActionText) && acknowledgementActionText) {
      console.error(
        'Dialogs should contain a maximum of two actions. ' +
        'If a single action is provided, it must be an acknowledgement action. ' +
        'If two actions are provided, one must be a confirming action, and the other a dismissing action. ' +
        'Providing a third action such as “Learn more” is not recommended as it navigates the user away from the dialog, leaving the dialog task unfinished. ' +
        'https://material.io/design/components/dialogs.html#actions'
      );

      return null;
    }

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
        {title &&
        <DialogTitle>{title}</DialogTitle>
        }

        <DialogContent className={title ? null : classes.noTitlePadding}>
          <DialogContentText>
            {contentText}
          </DialogContentText>
        </DialogContent>

        {(dismissiveActionText || confirmingActionText || acknowledgementActionText) &&
        <DialogActions>
          {dismissiveActionText && <Button color="primary">{dismissiveActionText}</Button>}
          {confirmingActionText && <Button color="primary">{confirmingActionText}</Button>}
          {acknowledgementActionText && <Button color="primary">{acknowledgementActionText}</Button>}
        </DialogActions>
        }
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  fullScreen: PropTypes.bool,
  open: PropTypes.bool.isRequired,

  // Custom Properties
  title: PropTypes.string,
  contentText: PropTypes.string.isRequired,
  dismissiveActionText: PropTypes.string,
  confirmingActionText: PropTypes.string,
  acknowledgementActionText: PropTypes.string,

  // Dialog Events
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AlertDialog);