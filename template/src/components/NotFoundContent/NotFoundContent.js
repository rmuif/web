import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Fab, Box } from "@material-ui/core";

import { Home as HomeIcon } from "@material-ui/icons";

import EmptyState from "../EmptyState";

import { ReactComponent as NotFoundIllustration } from "../../illustrations/not-found.svg";

class NotFoundContent extends Component {
  render() {
    return (
      <EmptyState
        image={<NotFoundIllustration />}
        title="Page not found"
        description="The page doesn’t exist"
        button={
          <Fab variant="extended" color="primary" component={Link} to="/">
            <Box clone mr={1}>
              <HomeIcon />
            </Box>
            Home
          </Fab>
        }
      />
    );
  }
}

export default NotFoundContent;
