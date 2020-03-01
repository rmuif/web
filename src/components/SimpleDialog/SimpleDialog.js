import React from "react";

import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SimpleDialog (props) {
    // Dialog Properties
    const { dialogProps } = props;

    // Custom Properties
    const { title, content } = props;

    return (
      <Dialog {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}

        {content}
      </Dialog>
    );
}

SimpleDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  title: PropTypes.string,
  content: PropTypes.element.isRequired
};
