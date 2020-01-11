import React, { Component } from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserAvatar from '../UserAvatar';

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

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

  render() {
    // Properties
    const {
      performingAction,
      theme,
      user,
      userData
    } = this.props;

    // Events
    const {
      onSignUpClick,
      onSignInClick
    } = this.props;

    const {
      menu
    } = this.state;

    const menuItems = [
      {
        children: 'About',
        onClick: () => {
          this.closeMenu();

          this.props.onAboutClick();
        }
      },
      {
        children: 'Settings',
        onClick: () => {
          this.closeMenu();

          this.props.onSettingsClick();
        }
      },
      {
        children: 'Sign out',
        onClick: () => {
          this.closeMenu();

          this.props.onSignOutClick();
        }
      }
    ];

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant={theme.dense ? 'dense' : 'regular'}>
          <Box display="flex" flexGrow={1}>
            <Typography color="inherit" variant="h6">{process.env.REACT_APP_TITLE}</Typography>
          </Box>

          {user &&
            <>
              <IconButton color="inherit" disabled={performingAction} onClick={this.openMenu}>
                <UserAvatar user={Object.assign(user, userData)} />
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                {menuItems.map((menuItem, index) => {
                  return (
                    <MenuItem key={index} dense={theme.dense} disabled={performingAction} onClick={menuItem.onClick}>
                      {menuItem.children}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          }

          {!user &&
            <>
              <Box mr={1}>
                <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignUpClick}>Sign up</Button>
              </Box>

              <Button color="secondary" disabled={performingAction} variant="contained" onClick={onSignInClick}>Sign in</Button>
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
  theme: PropTypes.object.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onAboutClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default Bar;
