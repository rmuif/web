import React from "react";

import PropTypes from "prop-types";

import Hidden from "@material-ui/core/Hidden";

import AboutDialog from "../AboutDialog";
import SignUpDialog from "../SignUpDialog";
import SignInDialog from "../SignInDialog";
import SettingsDialog from "../SettingsDialog";
import DeleteAccountDialog from "../DeleteAccountDialog";
import AlertDialog from "../AlertDialog";

export default function DialogHost (props) {
    // Properties
    const { performingAction, theme, user, userData, dialogs } = props;

    // Functions
    const { openSnackbar } = props;

    const { aboutDialog, signUpDialog, signInDialog, settingsDialog, deleteAccountDialog, signOutDialog} = dialogs;
    
    const propObj = { performingAction, theme, user, userData, openSnackbar}

    return (
      <>
        <AboutDialog
          dialogProps={aboutDialog.dialogProps}
          {...propObj}
          {...aboutDialog.props}
        />

        {user && (
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}
              {...propObj}
              {...signOutDialog.props}
            />
        )}

        <Hidden xsDown>
          {user && (
              <DeleteAccountDialog
                dialogProps={deleteAccountDialog.dialogProps}
                {...propObj}
                {...deleteAccountDialog.props}
              />
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}
                {...propObj}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}
                {...propObj}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden smDown>
          {user && (
              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}
                {...propObj}
                {...settingsDialog.props}
              />
          )}
        </Hidden>

        <Hidden smUp>
          {user && (
              <DeleteAccountDialog
                dialogProps={{
                  fullScreen: true,

                  ...deleteAccountDialog.dialogProps
                }}
                {...propObj}
                {...deleteAccountDialog.props}
              />
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={{
                  fullScreen: true,

                  ...signUpDialog.dialogProps
                }}
                {...propObj}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={{
                  fullScreen: true,

                  ...signInDialog.dialogProps
                }}
                {...propObj}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden mdUp>
          {user && (
              <SettingsDialog
                dialogProps={{
                  fullScreen: true,

                  ...settingsDialog.dialogProps
                }}
                {...propObj}
                {...settingsDialog.props}
              />
          )}
        </Hidden>
      </>
    );
}

DialogHost.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  dialogs: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};
