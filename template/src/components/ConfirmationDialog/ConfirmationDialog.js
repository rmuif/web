import React, { Component } from "react";

import PropTypes from "prop-types";

import { Dialog, DialogTitle, DialogActions } from "@material-ui/core";

class ConfirmationDialog extends Component {
  render() {
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { title, content, dismissiveAction, confirmingAction } = this.props;

    if (!dismissiveAction || !confirmingAction) {
      console.error("Provide confirmation and dismissive buttons.");

      return null;
    }

    return (
      <Dialog {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}

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
