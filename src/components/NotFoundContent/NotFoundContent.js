import React from "react";

import FindIcon from "@material-ui/icons/FindInPage";

import EmptyState from "../EmptyState";

export default function NotFoundContent () {
    return (
      <EmptyState
        icon={<FindIcon />}
        title="Content not found"
        description="The requested URL was not found on this server"
      />
    );
}

