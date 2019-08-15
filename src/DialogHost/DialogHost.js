import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import SignUpDialog from '../dialogs/SignUpDialog';
import SignInDialog from '../dialogs/SignInDialog';
import SettingsDialog from '../dialogs/SettingsDialog';
import AlertDialog from '../dialogs/AlertDialog';

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
    const signOutDialog = dialogs.signOutDialog;

    return (
      <React.Fragment>
        <Hidden xsDown>
          {!signedIn &&
            <React.Fragment>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}

                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}

                {...signInDialog.props}
              />
            </React.Fragment>
          }
        </Hidden>

        <Hidden smDown>
          {signedIn &&
            <SettingsDialog
              dialogProps={settingsDialog.dialogProps}

              {...settingsDialog.props}
            />
          }
        </Hidden>

        <Hidden smUp>
          {!signedIn &&
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
            </React.Fragment>
          }
        </Hidden>

        <Hidden mdUp>
          {signedIn &&
            <SettingsDialog
              dialogProps={{
                fullScreen: true,

                ...settingsDialog.dialogProps
              }}

              {...settingsDialog.props}
            />
          }
        </Hidden>

        {signedIn &&
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
  signedIn: PropTypes.bool.isRequired,
  dialogs: PropTypes.object.isRequired
};

export default DialogHost;