import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import SignUpDialog from '../SignUpDialog';
import SignInDialog from '../SignInDialog';
import SettingsDialog from '../SettingsDialog';
import DeleteAccountDialog from '../DeleteAccountDialog';
import AlertDialog from '../AlertDialog';

class DialogHost extends Component {
  render() {
    // Properties
    const {
      signedIn,
      dialogs
    } = this.props;

    const signUpDialog = dialogs.signUpDialog;
    const signInDialog = dialogs.signInDialog;
    const settingsDialog = dialogs.settingsDialog;
    const deleteAccountDialog = dialogs.deleteAccountDialog;
    const signOutDialog = dialogs.signOutDialog;

    return (
      <>
        <Hidden xsDown>
          {signedIn &&
            <>
              <DeleteAccountDialog
                dialogProps={deleteAccountDialog.dialogProps}

                {...deleteAccountDialog.props}
              />
            </>
          }

          {!signedIn &&
            <>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}

                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}

                {...signInDialog.props}
              />
            </>
          }
        </Hidden>

        <Hidden smDown>
          {signedIn &&
            <>
              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}

                {...settingsDialog.props}
              />
            </>
          }
        </Hidden>

        <Hidden smUp>
          {signedIn &&
            <>
              <DeleteAccountDialog
                dialogProps={{
                  fullScreen: true,

                  ...deleteAccountDialog.dialogProps
                }}

                {...deleteAccountDialog.props}
              />
            </>
          }

          {!signedIn &&
            <>
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
            </>
          }
        </Hidden>

        <Hidden mdUp>
          {signedIn &&
            <>
              <SettingsDialog
                dialogProps={{
                  fullScreen: true,

                  ...settingsDialog.dialogProps
                }}

                {...settingsDialog.props}
              />
            </>
          }
        </Hidden>

        {signedIn &&
          <>
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}

              {...signOutDialog.props}
            />
          </>
        }
      </>
    );
  }
}

DialogHost.defaultProps = {
  signedIn: false
};

DialogHost.propTypes = {
  // Properties
  signedIn: PropTypes.bool.isRequired,
  dialogs: PropTypes.object.isRequired
};

export default DialogHost;
