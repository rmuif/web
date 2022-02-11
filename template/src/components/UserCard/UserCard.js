import React from "react";

import PropTypes from "prop-types";

import { Card, CardHeader } from "@mui/material";

function UserCard(props) {
  const user = props.user;

  return (
    <Card>
      <CardHeader
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
