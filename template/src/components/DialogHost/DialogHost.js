import React, { Component } from "react";

import PropTypes from "prop-types";

import { Hidden } from "@material-ui/core";

import AboutDialog from "../AboutDialog";

import SignUpDialog from "../SignUpDialog";
import SignInDialog from "../SignInDialog";
import SettingsDialog from "../SettingsDialog";
import DeleteAccountDialog from "../DeleteAccountDialog";
import AlertDialog from "../AlertDialog";

class DialogHost extends Component {
  render() {
    // Properties
    const { performingAction, theme, user, userData, dialogs } = this.props;

    // Functions
    const { openSnackbar } = this.props;

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
          performingAction={performingAction}
          theme={theme}
          user={user}
          userData={userData}
          openSnackbar={openSnackbar}
          {...aboutDialog.props}
        />

        {user && (
          <>
            <AlertDialog
              dialogProps={signOutDialog.dialogProps}
              performingAction={performingAction}
              theme={theme}
              user={user}
              userData={userData}
              openSnackbar={openSnackbar}
              {...signOutDialog.props}
            />
          </>
        )}

        <Hidden xsDown>
          {user && (
            <>
              <DeleteAccountDialog
                dialogProps={deleteAccountDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...deleteAccountDialog.props}
              />
            </>
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden smDown>
          {user && (
            <>
              <SettingsDialog
                dialogProps={settingsDialog.dialogProps}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...settingsDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden smUp>
          {user && (
            <>
              <DeleteAccountDialog
                dialogProps={{
                  fullScreen: true,

                  ...deleteAccountDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...deleteAccountDialog.props}
              />
            </>
          )}

          {!user && (
            <>
              <SignUpDialog
                dialogProps={{
                  fullScreen: true,

                  ...signUpDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={{
                  fullScreen: true,

                  ...signInDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...signInDialog.props}
              />
            </>
          )}
        </Hidden>

        <Hidden mdUp>
          {user && (
            <>
              <SettingsDialog
                dialogProps={{
                  fullScreen: true,

                  ...settingsDialog.dialogProps,
                }}
                performingAction={performingAction}
                theme={theme}
                user={user}
                userData={userData}
                openSnackbar={openSnackbar}
                {...settingsDialog.props}
              />
            </>
          )}
        </Hidden>
      </>
    );
  }
}

DialogHost.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
  dialogs: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default DialogHost;
