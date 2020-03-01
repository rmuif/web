import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import authProviders from "../../authProviders";

export default function AuthProviderList (props) {
    // Properties
    const { gutterBottom, performingAction } = props;

    // Events
    const { onAuthProviderClick } = props;

    return (
      <Box mb={gutterBottom ? 3 : 0}>
        <ButtonGroup
          disabled={performingAction}
          fullWidth
          orientation="vertical"
          variant="outlined"
        >
          {authProviders.map(authProvider => {
            const AuthProviderButton = withStyles({
              root: {
                color: authProvider.color
              }
            })(Button);

            return (
              <AuthProviderButton
                key={authProvider.providerId}
                startIcon={authProvider.icon}
                onClick={() => onAuthProviderClick(authProvider.providerId)}
              >
                {authProvider.name}
              </AuthProviderButton>
            );
          })}
        </ButtonGroup>
      </Box>
    );
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
