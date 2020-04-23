import React, { Component } from "react";

import PropTypes from "prop-types";

import {
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import { Link as LinkIcon, LinkOff as LinkOffIcon } from "@material-ui/icons";

import authProviders from "../../data/auth-providers";

import authentication from "../../services/authentication";

class LinksTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false,
    };
  }

  linkAuthProvider = (authProvider) => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .linkAuthProvider(authProvider)
          .then((value) => {
            this.props.openSnackbar(`${authProvider.name} linked`, 5);
          })
          .catch((reason) => {
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
              performingAction: false,
            });
          });
      }
    );
  };

  unlinkAuthProvider = (authProvider) => {
    this.setState(
      {
        performingAction: true,
      },
      () => {
        authentication
          .unlinkAuthProvider(authProvider.id)
          .then((value) => {
            this.props.openSnackbar(`${authProvider.name} unlinked`, 4);
          })
          .catch((reason) => {
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
              performingAction: false,
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
          {authProviders.map((authProvider) => {
            const authProviderData = authentication.authProviderData(
              authProvider.id
            );
            let identifier = null;

            if (authProviderData) {
              const displayName = authProviderData.displayName;
              const emailAddress = authProviderData.email;
              const phoneNumber = authProviderData.phoneNumber;

              identifier = displayName || emailAddress || phoneNumber;
            }

            return (
              <ListItem key={authProvider.id}>
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
  openSnackbar: PropTypes.func.isRequired,
};

export default LinksTab;
