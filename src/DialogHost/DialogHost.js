import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import SignUpDialog from '../dialogs/SignUpDialog/SignUpDialog';
import SignInDialog from '../dialogs/SignInDialog/SignInDialog';
import ResetPasswordDialog from '../dialogs/ResetPasswordDialog/ResetPasswordDialog';
import SettingsDialog from '../dialogs/SettingsDialog/SettingsDialog';
import AlertDialog from '../dialogs/AlertDialog/AlertDialog';

class DialogHost extends Component {
  render() {

    // Properties
    const {
      isSignedIn,
      dialogs,
      parameters,
      functions,
      eventHandlers
    } = this.props;

    // Functions
    const {
      closeDialog
    } = this.props;

    const signUpDialog = dialogs.signUpDialog;
    const signInDialog = dialogs.signInDialog;
    const resetPasswordDialog = dialogs.resetPasswordDialog;
    const welcomeDialog = dialogs.welcomeDialog;
    const settingsDialog = dialogs.settingsDialog;
    const signOutDialog = dialogs.signOutDialog;

    return (
      <React.Fragment>
        <Hidden xsDown>
          {isSignedIn &&
            <React.Fragment>
              <AlertDialog
                dialogProps={{
                  open: welcomeDialog.open,

                  onClose: () => closeDialog('welcomeDialog')
                }}

                {...parameters.welcomeDialog}

                {...eventHandlers.welcomeDialog}
              />

              <SettingsDialog
                open={settingsDialog.open}

                {...parameters.settingsDialog}

                onClose={() => closeDialog('settingsDialog')}

                {...eventHandlers.settingsDialog}
              />
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <SignUpDialog
                open={signUpDialog.open}

                {...parameters.signUpDialog}

                {...functions.signUpDialog}

                onClose={() => closeDialog('signUpDialog')}

                {...eventHandlers.signUpDialog}
              />

              <SignInDialog
                open={signInDialog.open}

                {...parameters.signInDialog}

                {...functions.signInDialog}

                onClose={() => closeDialog('signInDialog')}

                {...eventHandlers.signInDialog}
              />

              <ResetPasswordDialog
                open={resetPasswordDialog.open}

                {...parameters.resetPasswordDialog}

                {...functions.resetPasswordDialog}

                onClose={() => closeDialog('resetPasswordDialog')}

                {...eventHandlers.resetPasswordDialog}
              />
            </React.Fragment>
          }
        </Hidden>

        <Hidden smUp>
          {isSignedIn &&
            <React.Fragment>
              <AlertDialog
                dialogProps={{
                  fullScreen: true,
                  open: welcomeDialog.open,

                  onClose: () => closeDialog('welcomeDialog')
                }}

                {...parameters.welcomeDialog}

                {...eventHandlers.welcomeDialog}
              />

              <SettingsDialog
                fullScreen
                open={settingsDialog.open}

                {...parameters.settingsDialog}

                onClose={() => closeDialog('settingsDialog')}

                {...eventHandlers.settingsDialog}
              />
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <SignUpDialog
                fullScreen
                open={signUpDialog.open}

                {...parameters.signUpDialog}

                {...functions.signUpDialog}

                onClose={() => closeDialog('signUpDialog')}

                {...eventHandlers.signUpDialog}
              />

              <SignInDialog
                fullScreen
                open={signInDialog.open}

                {...parameters.signInDialog}

                {...functions.signInDialog}

                onClose={() => closeDialog('signInDialog')}

                {...eventHandlers.signInDialog}
              />

              <ResetPasswordDialog
                fullScreen
                open={resetPasswordDialog.open}

                {...parameters.resetPasswordDialog}

                {...functions.resetPasswordDialog}

                onClose={() => closeDialog('resetPasswordDialog')}

                {...eventHandlers.resetPasswordDialog}
              />
            </React.Fragment>
          }
        </Hidden>

        {isSignedIn &&
          <React.Fragment>
            <AlertDialog
              dialogProps={{
                open: signOutDialog.open,

                onClose: () => closeDialog('signOutDialog')
              }}

              {...parameters.signOutDialog}

              {...eventHandlers.signOutDialog}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

DialogHost.propTypes = {

  // Properties
  isSignedIn: PropTypes.bool.isRequired,
  dialogs: PropTypes.object.isRequired,
  parameters: PropTypes.object,
  eventHandlers: PropTypes.object,

  // Functions
  closeDialog: PropTypes.func.isRequired
};

export default DialogHost;