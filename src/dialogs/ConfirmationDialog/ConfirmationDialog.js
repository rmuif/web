import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

/**
 * Confirmation dialogs give users the ability to provide final confirmation of a choice before committing to it, so
 * they have a chance to change their minds if necessary. If the user confirms a choice, it’s carried out. Otherwise,
 * the user can dismiss the dialog. For example, users can listen to multiple ringtones but only make a final selection
 * upon touching “OK.”
 */
class ConfirmationDialog extends Component {
  render() {
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const {
      title,
      content,
      dismissiveAction,
      confirmingAction
    } = this.props;

    if (!dismissiveAction || !confirmingAction) {
      console.error('Provide confirmation and dismissive buttons.');

      return null;
    }

    return (
      <Dialog {...dialogProps}>
        {title &&
          <DialogTitle>{title}</DialogTitle>
        }

        {content}

        <DialogActions>
          {dismissiveAction}
          {confirmingAction}
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
  dismissiveAction: PropTypes.element.isRequired,
  confirmingAction: PropTypes.element.isRequired,
};

export default ConfirmationDialog;