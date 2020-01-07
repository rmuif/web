import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

import PersonIcon from '@material-ui/icons/Person';

import authentication from '../../services/authentication';

const styles = (theme) => ({
  nameInitials: {
    cursor: 'default'
  }
});

class UserAvatar extends Component {
  render() {
    // Styling
    const {
      classes
    } = this.props;

    // Properties
    const {
      user,
      defaultCursor
    } = this.props;

    if (!user) {
      return <PersonIcon />;
    }

    const photoUrl = user.photoURL;

    if (photoUrl) {
      return (
        <Avatar alt="Avatar" src={photoUrl} />
      );
    }

    const nameInitials = authentication.user.getNameInitials({
      ...user
    });

    if (nameInitials) {
      return (
        <Avatar alt="Avatar">
          <span className={defaultCursor && classes.nameInitials}>{nameInitials}</span>
        </Avatar>
      );
    }

    return <PersonIcon />;
  }
}

UserAvatar.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  user: PropTypes.object.isRequired,
  defaultCursor: PropTypes.bool
};

export default withStyles(styles)(UserAvatar);
