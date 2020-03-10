import React, { Component } from "react";

import EmptyState from "../EmptyState";

import { ReactComponent as PageNotFoundIllustration } from "../../illustrations/page-not-found.svg";

class NotFoundContent extends Component {
  render() {
    return (
      <EmptyState
        image={<PageNotFoundIllustration />}
        title="Page not found"
        description="The requested URL was not found on this server"
      />
    );
  }
}

export default NotFoundContent;
