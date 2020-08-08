import React from "react";

import PropTypes from "prop-types";

import { Card, CardHeader } from "@material-ui/core";

function UserCard(props) {
  const user = props.user;

  const hasProfile = user.firstName && user.lastName && user.username;

  return (
    <Card>
      {hasProfile && (
        <CardHeader
          title={`${user.firstName} ${user.lastName}`}
          subheader={user.username}
        />
      )}

      {!hasProfile && (
        <CardHeader
          title="No profile"
          subheader="You can setup your profile in Settings."
        />
      )}
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
