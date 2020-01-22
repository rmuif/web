import React, { Component } from "react";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import AppleIcon from "mdi-material-ui/Apple";
import FacebookBoxIcon from "mdi-material-ui/FacebookBox";
import GitHubCircleIcon from "mdi-material-ui/GithubCircle";
import GoogleIcon from "mdi-material-ui/Google";
import MicrosoftIcon from "mdi-material-ui/Microsoft";
import TwitterIcon from "mdi-material-ui/Twitter";
import YahooIcon from "mdi-material-ui/Yahoo";

class AuthProviderList extends Component {
  render() {
    // Properties
    const { gutterBottom, performingAction } = this.props;

    // Events
    const { onAuthProviderClick } = this.props;

    const authProviders = [
      {
        providerId: "apple.com",
        icon: <AppleIcon />,
        name: "Apple"
      },
      {
        providerId: "facebook.com",
        icon: <FacebookBoxIcon />,
        name: "Facebook"
      },
      {
        providerId: "github.com",
        icon: <GitHubCircleIcon />,
        name: "GitHub"
      },
      {
        providerId: "google.com",
        icon: <GoogleIcon />,
        name: "Google"
      },
      {
        providerId: "microsoft.com",
        icon: <MicrosoftIcon />,
        name: "Microsoft"
      },
      {
        providerId: "twitter.com",
        icon: <TwitterIcon />,
        name: "Twitter"
      },
      {
        providerId: "yahoo.com",
        icon: <YahooIcon />,
        name: "Yahoo"
      }
    ];

    return (
      <Box mb={gutterBottom ? 3 : 0}>
        <ButtonGroup
          disabled={performingAction}
          fullWidth
          orientation="vertical"
          variant="outlined"
        >
          {authProviders.map(authProvider => {
            return (
              <Button
                key={authProvider.providerId}
                startIcon={authProvider.icon}
                onClick={() => onAuthProviderClick(authProvider.providerId)}
              >
                {authProvider.name}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    );
  }
}

AuthProviderList.defaultProps = {
  gutterBottom: false,
  performingAction: false
};

AuthProviderList.propTypes = {
  // Properties
  gutterBottom: PropTypes.bool,
  performingAction: PropTypes.bool,

  // Events
  onAuthProviderClick: PropTypes.func.isRequired
};

export default AuthProviderList;
