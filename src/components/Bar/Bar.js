import React, { Component } from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PersonIcon from '@material-ui/icons/Person';

import authentication from '../../services/authentication';

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

  getAvatar = () => {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    const photoUrl = user.photoURL;

    if (photoUrl) {
      return (<Avatar alt="Avatar" src={photoUrl} />);
    }

    const { userData } = this.props;

    if (!userData) {
      return <PersonIcon />;
    }

    const nameInitials = authentication.user.getNameInitials({
      ...user,
      ...userData
    });

    if (nameInitials) {
      return <Avatar alt="Avatar">{nameInitials}</Avatar>;
    }

    return <PersonIcon />;
  };

  openMenu = (event) => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl
      }
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    });
  };

  handleAboutClick = () => {
    this.closeMenu();
    this.props.onAboutClick();
  };

  handleSettingsClick = () => {
    this.closeMenu();
    this.props.onSettingsClick();
  };

  handleSignOutClick = () => {
    this.closeMenu();
    this.props.onSignOutClick();
  };

  render() {
    // Properties
    const { performingAction, user } = this.props;

    // Events
    const {
      onSignUpClick,
      onSignInClick
    } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Box display="flex" flexGrow={1}>
            <Typography color="inherit" variant="h6">{process.env.REACT_APP_TITLE}</Typography>
          </Box>

          {user &&
            <>
              <IconButton color="inherit" disabled={performingAction} onClick={this.openMenu}>
                {this.getAvatar()}
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem disabled={performingAction} onClick={this.handleAboutClick}>About</MenuItem>
                <MenuItem disabled={performingAction} onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem disabled={performingAction} onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </>
          }

          {!user &&
            <>
              <Box mr={1}>
                <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignUpClick}>Sign Up</Button>
              </Box>

              <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignInClick}>Sign In</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.defaultProps = {
  performingAction: false
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onAboutClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default Bar;
