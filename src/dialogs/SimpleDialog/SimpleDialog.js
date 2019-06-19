import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Simple dialogs can display items that are immediately actionable when selected. They don’t have text buttons. As
 * simple dialogs are interruptive, they should be used sparingly. Alternatively, dropdown menus provide options in a
 * non-modal, less disruptive way.
 */
class SimpleDialog extends Component {
  render() {

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const {
      title,
      content,
    } = this.props;

    return (
      <Dialog {...dialogProps}>
        {title &&
          <DialogTitle>{title}</DialogTitle>
        }

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