import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { Box, ButtonGroup, Button } from "@material-ui/core";

import authProviders from "../../data/auth-providers";

class AuthProviderList extends Component {
  render() {
    // Properties
    const { gutterBottom, performingAction } = this.props;

    // Events
    const { onAuthProviderClick } = this.props;

    return (
      <Box mb={gutterBottom ? 3 : 0}>
        <ButtonGroup
          disabled={performingAction}
          fullWidth
          orientation="vertical"
          variant="outlined"
        >
          {authProviders.map((authProvider) => {
            const AuthProviderButton = withStyles({
              root: {
                color: authProvider.color,
              },
            })(Button);

            return (
              <AuthProviderButton
                key={authProvider.id}
                startIcon={authProvider.icon}
                onClick={() => onAuthProviderClick(authProvider)}
              >
                {authProvider.name}
              </AuthProviderButton>
            );
          })}
        </ButtonGroup>
      </Box>
    );
  }
}

AuthProviderList.defaultProps = {
  gutterBottom: false,
  performingAction: false,
};

AuthProviderList.propTypes = {
  // Properties
  gutterBottom: PropTypes.bool,
  performingAction: PropTypes.bool,

  // Events
  onAuthProviderClick: PropTypes.func.isRequired,
};

export default AuthProviderList;
