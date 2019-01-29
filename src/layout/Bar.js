import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing.unit
  }
});

class Bar extends Component {
  render() {
    const { classes, title, isSignedIn, isSigningUp, isSigningIn, onSignUpClick, onSignInClick, onSignOutClick } = this.props;

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

          {isSignedIn && <Button color="secondary" variant="contained" onClick={onSignOutClick}>Sign Out</Button>}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Bar);