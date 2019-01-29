import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PersonIcon from '@material-ui/icons/Person';

const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing.unit
  }
});

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

  handleSignOutClick = () => {
    this.closeMenu();
    this.props.onSignOutClick();
  };

  render() {
    // Properties
    const { classes, title, isSignedIn, isSigningUp, isSigningIn } = this.props;

    // Events
    const { onSignUpClick, onSignInClick } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{title}</Typography>

          {!isSignedIn &&
            <div>
              <Button className={classes.signUpButton} color="secondary" disabled={isSigningUp} variant="contained" onClick={onSignUpClick}>Sign Up</Button>
              <Button color="secondary" disabled={isSigningIn} variant="contained" onClick={onSignInClick}>Sign In</Button>
            </div>
          }

          {isSignedIn &&
            <div>
              <IconButton color="inherit" onClick={this.openMenu}>
                <PersonIcon />
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                <MenuItem onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Bar);