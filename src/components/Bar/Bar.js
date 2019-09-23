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

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

  getNameInitials = () => {
    const { user, userData } = this.props;

    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const username = userData.username;
    const displayName = user.displayName;

    if (firstName && lastName) {
      return firstName.charAt(0) + lastName.charAt(0);
    } else if (firstName) {
      return firstName.charAt(0)
    } else if (lastName) {
      return lastName.charAt(0);
    } else if (username) {
      return username.charAt(0);
    } else if (displayName) {
      return displayName.charAt(0);
    } else {
      return 'NN';
    }
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
    const { performingAction, signedIn, user } = this.props;

    // Events
    const { onSignUpClick, onSignInClick } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Box flexGrow={1}>
            <Typography color="inherit" variant="h6">{process.env.REACT_APP_NAME}</Typography>
          </Box>

          {signedIn &&
            <>
              <IconButton color="inherit" disabled={performingAction} onClick={this.openMenu}>
                {user.photoURL &&
                  <Avatar alt="Avatar" src={user.photoURL} />
                }

                {!user.photoURL &&
                  <Avatar alt="Avatar">
                    {this.getNameInitials()}
                  </Avatar>
                }
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem disabled={performingAction} onClick={this.handleSettingsClick}>Settings</MenuItem>
                <MenuItem disabled={performingAction} onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </>
          }

          {!signedIn &&
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
  performingAction: false,
  signedIn: false
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default Bar;
