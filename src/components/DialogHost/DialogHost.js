import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import AboutDialog from '../AboutDialog';
import SignUpDialog from '../SignUpDialog';
import SignInDialog from '../SignInDialog';
import SettingsDialog from '../SettingsDialog';
import DeleteAccountDialog from '../DeleteAccountDialog';
import AlertDialog from '../AlertDialog';

class DialogHost extends Component {
  render() {
    // Properties
    const {
      user,
      dialogs
    } = this.props;

    const aboutDialog = dialogs.aboutDialog;
    const signUpDialog = dialogs.signUpDialog;
    const signInDialog = dialogs.signInDialog;
    const settingsDialog = dialogs.settingsDialog;
    const deleteAccountDialog = dialogs.deleteAccountDialog;
    const signOutDialog = dialogs.signOutDialog;

    return (
      <>
        <AboutDialog
          dialogProps={aboutDialog.dialogProps}

          {...aboutDialog.props}
        />

        {user &&
          <>
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}

              {...signOutDialog.props}
            />
          </>
        }

        <Hidden xsDown>
          {user &&
            <>
              <DeleteAccountDialog
                dialogProps={deleteAccountDialog.dialogProps}

                {...deleteAccountDialog.props}
              />
            </>
          }

          {!user &&
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
          {user &&
            <>
              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}

                {...settingsDialog.props}
              />
            </>
          }
        </Hidden>

        <Hidden smUp>
          {user &&
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

          {!user &&
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
          {user &&
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
      </>
    );
  }
}

DialogHost.propTypes = {
  // Properties
  user: PropTypes.object,
  dialogs: PropTypes.object.isRequired
};

export default DialogHost;
