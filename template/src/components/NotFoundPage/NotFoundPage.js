import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Fab } from "@mui/material";

import { Home as HomeIcon } from "@mui/icons-material";

import EmptyState from "../EmptyState";

import { ReactComponent as NotFoundIllustration } from "../../illustrations/not-found.svg";

class NotFoundPage extends Component {
  render() {
    return (
      <EmptyState
        image={<NotFoundIllustration />}
        title="Page doesn’t exist."
        description="The page you’re trying to access doesn’t exist."
        button={
          <Fab variant="extended" color="primary" component={Link} to="/">
            <HomeIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
            Home
          </Fab>
        }
      />
    );
  }
}

export default NotFoundPage;
