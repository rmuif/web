import React, { Component } from 'react';

import PropTypes from 'prop-types';

import firebase from 'firebase/app';

import { withStyles } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import GoogleIcon from 'mdi-material-ui/Google';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';
import TwitterIcon from 'mdi-material-ui/Twitter';

const styles = (theme) => ({
  dialogActions: {
    justifyContent: 'center',

    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1)
  },

  dialogActionsMobile: {
    display: 'grid',
    justifyContent: 'stretch',

    marginTop: theme.spacing(2.5),
    marginBottom: -theme.spacing(0.5)
  },

  buttonMobile: {
    marginBottom: theme.spacing(1.5)
  },

  facebook: {
    backgroundColor: '#3c5a99',
    color: '#ffffff'
  },

  google: {
    backgroundColor: '#4285f4',
    color: '#ffffff'
  },

  gitHub: {
    backgroundColor: '#24292e',
    color: '#ffffff'
  },

  twitter: {
    backgroundColor: '#1da1f2',
    color: '#ffffff'
  },

  icon: {
    marginRight: theme.spacing(0.5)
  }
});

class AuthProviderList extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isPerformingAuthAction } = this.props;

    // Events
    const { onAuthProviderClick } = this.props;

    return (
      <React.Fragment>
        <Hidden only="xs">
          <DialogActions className={classes.dialogActions}>
            <Button className={classes.facebook} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.FacebookAuthProvider())}>
              <FacebookBoxIcon className={classes.icon} />
              Facebook
            </Button>

            <Button className={classes.google} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GoogleAuthProvider())}>
              <GoogleIcon className={classes.icon} />
              Google
            </Button>

            <Button className={classes.gitHub} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GithubAuthProvider())}>
              <GitHubCircleIcon className={classes.icon} />
              GitHub
            </Button>

            <Button className={classes.twitter} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.TwitterAuthProvider())}>
              <TwitterIcon className={classes.icon} />
              Twitter
            </Button>
          </DialogActions>
        </Hidden>

        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <DialogActions className={classes.dialogActionsMobile} disableSpacing>
            <Button className={`${classes.facebook} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.FacebookAuthProvider())}>
              <FacebookBoxIcon className={classes.icon} />
              Facebook
            </Button>

            <Button className={`${classes.google} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GoogleAuthProvider())}>
              <GoogleIcon className={classes.icon} />
              Google
            </Button>

            <Button className={`${classes.gitHub} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.GithubAuthProvider())}>
              <GitHubCircleIcon className={classes.icon} />
              GitHub
            </Button>

            <Button className={`${classes.twitter} ${classes.buttonMobile}`} disabled={isPerformingAuthAction} variant="contained" onClick={() => onAuthProviderClick(new firebase.auth.TwitterAuthProvider())}>
              <TwitterIcon className={classes.icon} />
              Twitter
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