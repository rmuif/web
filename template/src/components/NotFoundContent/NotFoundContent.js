import React, { Component } from "react";

import { FindInPage as FindInPageIcon } from "@material-ui/icons";

import EmptyState from "../EmptyState";

class NotFoundContent extends Component {
  render() {
    return (
      <EmptyState
        icon={<FindInPageIcon />}
        title="Content not found"
        description="The requested URL was not found on this server"
      />
    );
  }
}

export default NotFoundContent;
