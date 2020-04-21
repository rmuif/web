import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { Avatar, ListItemAvatar } from "@material-ui/core";

import {
  AccountCircle as AccountCircleIcon,
  Person as PersonIcon,
} from "@material-ui/icons";

import authentication from "../../services/authentication";

const styles = (theme) => ({
  nameInitials: {
    cursor: "default",
  },
});

class UserAvatar extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { context, user, defaultCursor } = this.props;

    if (context === "standalone") {
      if (!user) {
        return <AccountCircleIcon />;
      }

      const photoUrl = user.photoURL;

      if (photoUrl) {
        return <Avatar alt="Avatar" src={photoUrl} />;
      }

      const nameInitials = authentication.getNameInitials({
        ...user,
      });

      if (nameInitials) {
        return (
          <Avatar alt="Avatar">
            <span className={defaultCursor && classes.nameInitials}>
              {nameInitials}
            </span>
          </Avatar>
        );
      }

      return <AccountCircleIcon />;
    }

    if (context === "list") {
      if (!user) {
        return (
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
        );
      }

      const photoUrl = user.photoURL;

      if (photoUrl) {
        return (
          <ListItemAvatar>
            <Avatar alt="Avatar" src={photoUrl} />
          </ListItemAvatar>
        );
      }

      const nameInitials = authentication.getNameInitials({
        ...user,
      });

      if (nameInitials) {
        return (
          <ListItemAvatar>
            <Avatar alt="Avatar">
              <span className={defaultCursor && classes.nameInitials}>
                {nameInitials}
              </span>
            </Avatar>
          </ListItemAvatar>
        );
      }

      return (
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
      );
    }

    return null;
  }
}

UserAvatar.defaultProps = {
  context: "standalone",
};

UserAvatar.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  context: PropTypes.string,
  user: PropTypes.object.isRequired,
  defaultCursor: PropTypes.bool,
};

export default withStyles(styles)(UserAvatar);
