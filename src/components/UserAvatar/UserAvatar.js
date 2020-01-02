import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import PersonIcon from '@material-ui/icons/Person';

import authentication from '../../services/authentication';

class UserAvatar extends Component {
  render() {
    // Properties
    const {
      user
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
      return <Avatar alt="Avatar">{nameInitials}</Avatar>;
    }

    return <PersonIcon />;
  }
}

UserAvatar.propTypes = {
  // Properties
  user: PropTypes.object.isRequired
};

export default UserAvatar;
