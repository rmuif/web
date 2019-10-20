import React, { Component } from 'react'

import PropTypes from 'prop-types'

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';
import GoogleIcon from 'mdi-material-ui/Google';
import MicrosoftIcon from 'mdi-material-ui/Microsoft';
import TwitterIcon from 'mdi-material-ui/Twitter';
import YahooIcon from 'mdi-material-ui/Yahoo';

import authentication from '../../services/authentication';

class LinksTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false
    };
  }


  linkAuthProvider = (authProvider) => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.linkAuthProvider(authProvider.providerId).then((value) => {
        this.props.openSnackbar(`${authProvider.name} linked`, 5);
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false
        });
      });
    });
  };

  unlinkAuthProvider = (authProvider) => {
    this.setState({
      performingAction: true
    }, () => {
      authentication.unlinkAuthProvider(authProvider.providerId).then((value) => {
        this.props.openSnackbar(`${authProvider.name} unlinked`, 4);
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false
        });
      });
    });
  };

  render() {
    // Properties
    const { theme } = this.props;

    const { performingAction } = this.state;

    const authProviders = [
      {
        providerId: 'facebook.com',
        color: '#3c5a99',
        icon: <FacebookBoxIcon />,
        name: 'Facebook'
      },
      {
        providerId: 'github.com',
        color: '#24292e',
        icon: <GitHubCircleIcon />,
        name: 'GitHub'
      },
      {
        providerId: 'google.com',
        color: '#4285f4',
        icon: <GoogleIcon />,
        name: 'Google'
      },
      {
        providerId: 'microsoft.com',
        color: '#f65314',
        icon: <MicrosoftIcon />,
        name: 'Microsoft'
      },
      {
        providerId: 'twitter.com',
        color: '#1da1f2',
        icon: <TwitterIcon />,
        name: 'Twitter'
      },
      {
        providerId: 'yahoo.com',
        color: '#410093',
        icon: <YahooIcon />,
        name: 'Yahoo'
      }
    ];

    return (
      <DialogContent>
        <List disablePadding>
          {authProviders.map((authProvider) => {
            const authProviderData = authentication.authProviderData(authProvider.providerId);
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
                  <Box color={theme.type.id === 'light' ? authProvider.color : null}>
                    {authProvider.icon}
                  </Box>
                </ListItemIcon>

                {authProviderData &&
                  <ListItemText
                    primary={authProvider.name}
                    secondary={identifier}
                  />
                }

                {!authProviderData &&
                  <ListItemText
                    primary={authProvider.name}
                  />
                }

                <ListItemSecondaryAction>
                  {authProviderData &&
                    <Tooltip title="Unlink">
                      <div>
                        <IconButton disabled={performingAction} onClick={() => this.unlinkAuthProvider(authProvider)}>
                          <LinkOffIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }

                  {!authProviderData &&
                    <Tooltip title="Link">
                      <div>
                        <IconButton disabled={performingAction} onClick={() => this.linkAuthProvider(authProvider)}>
                          <LinkIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    )
  }
}

LinksTab.propTypes = {
  // Properties
  theme: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default LinksTab;
