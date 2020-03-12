import React, { Component } from "react";

import EmptyState from "../EmptyState";

import { ReactComponent as NotFoundIllustration } from "../../illustrations/not-found.svg";

class NotFoundContent extends Component {
  render() {
    return (
      <EmptyState
        image={<NotFoundIllustration />}
        title="Page not found"
        description="The page doesn’t exist"
      />
    );
  }
}

export default NotFoundContent;
