import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import PropTypes from "prop-types";

import UserAvatar from "../UserAvatar";

function UserCard(props) {
  const user = props.user;

  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar user={user} />}
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.username}
      />
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
