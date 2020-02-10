import React, { Component } from "react";

import FindIcon from "@material-ui/icons/FindInPage";

import EmptyState from "../EmptyState";

class NotFoundContent extends Component {
  render() {
    return (
      <EmptyState
        icon={<FindIcon />}
        title="Content not found"
        description="The requested URL was not found on this server"
      />
    );
  }
}

export default NotFoundContent;
