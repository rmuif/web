import React, { Component } from 'react';

import PropTypes from 'prop-types';

import firebase from 'firebase/app';

import { withStyles } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import GoogleIcon from 'mdi-material-ui/Google';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import TwitterIcon from 'mdi-material-ui/Twitter';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

const styles = (theme) => ({
  dialogActions: {
    justifyContent: 'center',

    marginTop: `${theme.spacing.unit * 2.5}px`,
    marginBottom: `${theme.spacing.unit}px`
  },

  dialogActionsMobile: {
    display: 'grid',
    justifyContent: 'stretch',

    marginTop: `${theme.spacing.unit * 2.5}px`,
    marginBottom: `${theme.spacing.unit / 3}px`
  },

  buttonMobile: {
    marginBottom: `${theme.spacing.unit * 1.5}px`
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
    const { classes, isPerformingAuthAction } = this.props;

    // Events
    const { onAuthProviderClick } = this.props;

    return (
      <React.Fragment>
        <Hidden only="xs">
          <DialogActions className={classes.dialogActions}>
            <Button className={classes.google} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GoogleAuthProvider())}>
              <GoogleIcon className={classes.icon} />
              Google
            </Button>

            <Button className={classes.facebook} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.FacebookAuthProvider())}>
              <FacebookBoxIcon className={classes.icon} />
              Facebook
            </Button>

            <Button className={classes.twitter} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.TwitterAuthProvider())}>
              <TwitterIcon className={classes.icon} />
              Twitter
            </Button>

            <Button className={classes.gitHub} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GithubAuthProvider())}>
              <GitHubCircleIcon className={classes.icon} />
              GitHub
            </Button>
          </DialogActions>
        </Hidden>

        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <DialogActions className={classes.dialogActionsMobile}>
            <Button className={`${classes.google} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GoogleAuthProvider())}>
              <GoogleIcon className={classes.icon} />
              Google
            </Button>

            <Button className={`${classes.facebook} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.FacebookAuthProvider())}>
              <FacebookBoxIcon className={classes.icon} />
              Facebook
            </Button>

            <Button className={`${classes.twitter} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.TwitterAuthProvider())}>
              <TwitterIcon className={classes.icon} />
              Twitter
            </Button>

            <Button className={`${classes.gitHub} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GithubAuthProvider())}>
              <GitHubCircleIcon className={classes.icon} />
              GitHub
            </Button>
          </DialogActions>
        </Hidden>
      </React.Fragment>
    );
  }
}

AuthProviderList.propTypes = {
  classes: PropTypes.object.isRequired,
  isPerformingAuthAction: PropTypes.bool,

  onAuthProviderClick: PropTypes.func.isRequired
};

export default withStyles(styles)(AuthProviderList);