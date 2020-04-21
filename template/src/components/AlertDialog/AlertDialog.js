import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const styles = (theme) => ({
  noTitlePadding: {
    paddingTop: theme.spacing(3),
  },
});

class AlertDialog extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const {
      title,
      contentText,
      dismissiveAction,
      confirmingAction,
      acknowledgementAction,
    } = this.props;

    if ((dismissiveAction || confirmingAction) && acknowledgementAction) {
      console.error(
        "Dialogs should contain a maximum of two actions. " +
          "If a single action is provided, it must be an acknowledgement action. " +
          "If two actions are provided, one must be a confirming action, and the other a dismissing action. " +
          "Providing a third action such as “Learn more” is not recommended as it navigates the user away from the dialog, leaving the dialog task unfinished. " +
          "https://material.io/design/components/dialogs.html#actions"
      );

      return null;
    }

    return (
      <Dialog {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}

        <DialogContent className={title ? null : classes.noTitlePadding}>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>

        {(dismissiveAction || confirmingAction || acknowledgementAction) && (
          <DialogActions>
            {dismissiveAction}
            {confirmingAction}
            {acknowledgementAction}
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  title: PropTypes.string,
  contentText: PropTypes.string.isRequired,
  dismissiveAction: PropTypes.element,
  confirmingAction: PropTypes.element,
  acknowledgementAction: PropTypes.element,
};

export default withStyles(styles)(AlertDialog);
