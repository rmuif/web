import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import WelcomeDialog from '../dialogs/WelcomeDialog/WelcomeDialog';
import SettingsDialog from '../dialogs/SettingsDialog/SettingsDialog';

import PropTypes from 'prop-types';

class DialogHost extends Component {
  render() {

    // Properties
    const {
      dialogs,
      parameters,
      eventHandlers
    } = this.props;

    // Functions
    const {
      openDialog,
      closeDialog
    } = this.props;

    const welcomeDialog = dialogs.welcomeDialog;
    const settingsDialog = dialogs.settingsDialog;

    return (
      <React.Fragment>
        <Button onClick={() => openDialog('welcomeDialog')}>Open "welcomeDialog" Dialog</Button>

        <Hidden xsDown>
          <WelcomeDialog
            open={welcomeDialog.open}

            {...parameters.welcomeDialog}

            onClose={() => closeDialog('welcomeDialog')}

            onCancelClick={() => closeDialog('welcomeDialog')}

            {...eventHandlers.welcomeDialog}
          />

          <SettingsDialog
            open={settingsDialog.open}

            {...parameters.settingsDialog}

            onClose={() => closeDialog('settingsDialog')}

            {...eventHandlers.settingsDialog}
          />
        </Hidden>

        <Hidden smUp>
          <WelcomeDialog
            fullScreen
            open={welcomeDialog.open}

            {...parameters.welcomeDialog}

            onClose={() => closeDialog('welcomeDialog')}

            onCancelClick={() => closeDialog('welcomeDialog')}

            {...eventHandlers.welcomeDialog}
          />

          <SettingsDialog
            fullScreen
            open={settingsDialog.open}

            {...parameters.settingsDialog}

            onClose={() => closeDialog('settingsDialog')}

            {...eventHandlers.settingsDialog}
          />
        </Hidden>
      </React.Fragment>
    );
  }
}

DialogHost.propTypes = {

  // Properties
  dialogs: PropTypes.object.isRequired,
  parameters: PropTypes.object,
  eventHandlers: PropTypes.object,

  // Functions
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default DialogHost;