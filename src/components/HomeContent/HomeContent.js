import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';

import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

import authentication from '../../services/authentication';

import EmptyState from '../EmptyState';

const styles = (theme) => ({
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

class HomeContent extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem('emailAddress');

      if (!emailAddress) {
        this.props.history.push('/');

        return;
      }

      authentication.signInWithEmailLink(emailAddress, emailLink).then((value) => {
        const user = value.user;
        const displayName = user.displayName;
        const emailAddress = user.email;

        this.props.openSnackbar(`Signed in as ${displayName || emailAddress}`);
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/expired-action-code':
          case 'auth/invalid-email':
          case 'auth/user-disabled':
            this.props.openSnackbar(message);
            break;

          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.props.history.push('/');
      });
    }
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { user } = this.props;

    if (user) {
      return (
        <EmptyState
          icon={<HomeIcon />}
          title="Home"
        />
      );
    }

    return (
      <EmptyState
        title={process.env.REACT_APP_TITLE}
        description={process.env.REACT_APP_DESCRIPTION}
        button={
          <Fab color="secondary" href="https://github.com/phoqe/react-material-ui-firebase" rel="noopener noreferrer" target="_blank" variant="extended">
            <GitHubCircleIcon className={classes.buttonIcon} />
            GitHub
          </Fab>
        }
      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomeContent.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  user: PropTypes.object
};

export default withRouter(withStyles(styles)(HomeContent));
