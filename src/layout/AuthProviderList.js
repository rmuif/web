import React, { Component } from 'react';

import PropTypes from 'prop-types';

import firebase from 'firebase/app';

import { withStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import GoogleIcon from 'mdi-material-ui/Google';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import TwitterIcon from 'mdi-material-ui/Twitter';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

const styles = (theme) => ({
  dialogActions: {
    marginTop: `${theme.spacing.unit * 2.5}px`,
    marginBottom: `${theme.spacing.unit}px`,

    justifyContent: 'center'
  },

  google: {
    backgroundColor: '#4285f4',
    color: '#ffffff'
  },

  facebook: {
    backgroundColor: '#3c5a99',
    color: '#ffffff'
  },

  twitter: {
    backgroundColor: '#1da1f2',
    color: '#ffffff'
  },

  gitHub: {
    backgroundColor: '#24292e',
    color: '#ffffff'
  },

  icon: {
    marginRight: `${theme.spacing.unit / 2}px`
  }
});

class AuthProviderList extends Component {
  render() {
    // Properties
    const { classes, isSigningIn } = this.props;

    // Events
    const { onAuthProviderClick } = this.props;

    return (
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.google} disabled={isSigningIn} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GoogleAuthProvider())}>
          <GoogleIcon className={classes.icon} />
          Google
        </Button>

        <Button className={classes.facebook} disabled variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.FacebookAuthProvider())}>
          <FacebookBoxIcon className={classes.icon} />
          Facebook
        </Button>

        <Button className={classes.twitter} disabled variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.TwitterAuthProvider())}>
          <TwitterIcon className={classes.icon} />
          Twitter
        </Button>

        <Button className={classes.gitHub} disabled variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GithubAuthProvider())}>
          <GitHubCircleIcon className={classes.icon} />
          GitHub
        </Button>
      </DialogActions>
    );
  }
}

AuthProviderList.propTypes = {
  classes: PropTypes.object.isRequired,
  isSigningIn: PropTypes.bool,

  onAuthProviderClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthProviderList);