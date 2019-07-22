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
      dialogs
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
                dialogProps={welcomeDialog.dialogProps}

                {...welcomeDialog.props}
              />

              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}

                {...settingsDialog.props}
              />
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}

                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}

                {...signInDialog.props}
              />

              <ResetPasswordDialog
                {...resetPasswordDialog.dialogProps}

                {...resetPasswordDialog.props}
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

                  ...welcomeDialog.dialogProps
                }}

                {...welcomeDialog.props}
              />

              <SettingsDialog
                dialogProps={{
                  fullScreen: true,

                  ...settingsDialog.dialogProps
                }}

                {...settingsDialog.props}
              />
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <SignUpDialog
                dialogProps={{
                  fullScreen: true,

                  ...signUpDialog.dialogProps
                }}

                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={{
                  fullScreen: true,

                  ...signInDialog.dialogProps
                }}

                {...signInDialog.props}
              />

              <ResetPasswordDialog
                fullScreen

                {...resetPasswordDialog.dialogProps}

                {...resetPasswordDialog.props}
              />
            </React.Fragment>
          }
        </Hidden>

        {isSignedIn &&
          <React.Fragment>
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}

              {...signOutDialog.props}
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
  dialogs: PropTypes.object.isRequired
};

export default DialogHost;