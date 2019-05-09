import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

class InputDialog extends Component {
  handleKeyPress = (event) => {
    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      event.preventDefault();

      this.props.onOkClick();
    }
  };

  render() {
    /**
     * Properties
     */

    // Dialog
    const { open } = this.props;

    // Custom
    const { title, contentText, textField, cancelText, okText, disableOkButton, highlightOkButton } = this.props;

    /**
     * Events
     */

    // Dialog
    const { onClose, onExited } = this.props;

    // Custom
    const { onCancelClick, onOkClick } = this.props;

    if (!onClose) {
      return null;
    }

    return (
      <Dialog open={open} onClose={onClose} onExited={onExited} onKeyPress={this.handleKeyPress}>
        {title && <DialogTitle>{title}</DialogTitle>}

        {contentText &&
          <DialogContent>
            <DialogContentText>{contentText}</DialogContentText>

            {textField &&
              <form>
                {textField}
              </form>
            }
          </DialogContent>
        }

        {(onCancelClick || onOkClick) &&
          <DialogActions>
            {onCancelClick &&
              <Button color="primary" onClick={onCancelClick}>
                {cancelText || 'Cancel'}
              </Button>
            }

            {onOkClick &&
              <Button color="primary" disabled={disableOkButton} variant={highlightOkButton && 'contained'} onClick={onOkClick}>
                {okText || 'OK'}
              </Button>
            }
          </DialogActions>
        }
      </Dialog>
    );
  }
}

InputDialog.propTypes = {
  open: PropTypes.bool.isRequired,

  title: PropTypes.string,
  contentText: PropTypes.string,
  textField: PropTypes.element,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  disableOkButton: PropTypes.bool,
  highlightOkButton: PropTypes.bool,

  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func,
  onCancelClick: PropTypes.func,
  onOkClick: PropTypes.func
};

export default InputDialog;