import React, { Component } from "react";

import PropTypes from "prop-types";

import DialogContent from "@material-ui/core/DialogContent";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";

import authProviders from "../../authProviders";

import authentication from "../../services/authentication";

class LinksTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false
    };
  }

  linkAuthProvider = authProvider => {
    this.setState(
      {
        performingAction: true
      },
      () => {
        authentication
          .linkAuthProvider(authProvider.providerId)
          .then(value => {
            this.props.openSnackbar(`${authProvider.name} linked`, 5);
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  unlinkAuthProvider = authProvider => {
    this.setState(
      {
        performingAction: true
      },
      () => {
        authentication
          .unlinkAuthProvider(authProvider.providerId)
          .then(value => {
            this.props.openSnackbar(`${authProvider.name} unlinked`, 4);
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  render() {
    // Properties
    const { theme } = this.props;

    const { performingAction } = this.state;

    return (
      <DialogContent>
        <List disablePadding>
          {authProviders.map(authProvider => {
            const authProviderData = authentication.authProviderData(
              authProvider.providerId
            );
            let identifier = null;

            if (authProviderData) {
              const displayName = authProviderData.displayName;
              const emailAddress = authProviderData.email;
              const phoneNumber = authProviderData.phoneNumber;

              identifier = displayName || emailAddress || phoneNumber;
            }

            return (
              <ListItem key={authProvider.providerId}>
                <ListItemIcon>
                  <Box color={theme.dark ? null : authProvider.color}>
                    {authProvider.icon}
                  </Box>
                </ListItemIcon>

                {authProviderData && (
                  <ListItemText
                    primary={authProvider.name}
                    secondary={identifier}
                  />
                )}

                {!authProviderData && (
                  <ListItemText primary={authProvider.name} />
                )}

                <ListItemSecondaryAction>
                  {authProviderData && (
                    <Tooltip title="Unlink">
                      <div>
                        <IconButton
                          disabled={performingAction}
                          onClick={() => this.unlinkAuthProvider(authProvider)}
                        >
                          <LinkOffIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  )}

                  {!authProviderData && (
                    <Tooltip title="Link">
                      <div>
                        <IconButton
                          disabled={performingAction}
                          onClick={() => this.linkAuthProvider(authProvider)}
                        >
                          <LinkIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    );
  }
}

LinksTab.propTypes = {
  // Properties
  theme: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default LinksTab;
