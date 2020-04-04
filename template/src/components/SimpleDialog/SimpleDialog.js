import React, { Component } from "react";

import PropTypes from "prop-types";

import { Dialog, DialogTitle } from "@material-ui/core";

class SimpleDialog extends Component {
  render() {
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { title, content } = this.props;

    return (
      <Dialog {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}

        {content}
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
};

export default SimpleDialog;
