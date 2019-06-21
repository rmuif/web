import React, { Component } from 'react';

import PropTypes from 'prop-types';

import validate from 'validate.js';

import { createMuiTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';
import GoogleIcon from 'mdi-material-ui/Google';
import MicrosoftIcon from 'mdi-material-ui/Microsoft';
import TwitterIcon from 'mdi-material-ui/Twitter';
import YahooIcon from 'mdi-material-ui/Yahoo';

import constraints from '../../constraints';
import settings from '../../settings';

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(0.5)
  },

  divider: {
    margin: 'auto',

    width: theme.spacing(0.125),
    height: '100%'
  },

  grid: {
    marginBottom: theme.spacing(2)
  }
});

const initialState = {
  emailAddress: '',
  password: '',

  errors: null
};

class SignInDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetPassword = () => {
    const { emailAddress } = this.state;

    const errors = validate({
      emailAddress: emailAddress
    }, {
      emailAddress: constraints.emailAddress
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: null
      }, () => {
        this.props.resetPassword(emailAddress);
      });
    }
  };

  signIn = () => {
    const { emailAddress, password } = this.state;

    const errors = validate({
      emailAddress: emailAddress,
      password: password
    }, {
      emailAddress: constraints.emailAddress,
      password: constraints.password
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: errors
      }, () => {
        this.props.signIn(emailAddress, password);
      });
    }
  };

  handleKeyPress = (event) => {
    const { emailAddress, password } = this.state;

    if (!emailAddress || !password) {
      return;
    }

    const key = event.key;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (key === 'Enter') {
      this.signIn();
    }
  };

  handleExited = () => {
    this.setState(initialState);
  };

  handleEmailAddressChange = (event) => {
    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress
    });
  };

  handlePasswordChange = (event) => {
    const password = event.target.value;

    this.setState({
      password: password
    });
  };

  render() {

    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { isPerformingAuthAction } = this.props;

    // Custom Events
    const { onAuthProviderClick } = this.props;

    const { emailAddress, password, errors } = this.state;

    const authProviders = [
      {
        providerId: 'facebook.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#3c5a99',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <FacebookBoxIcon className={classes.icon} />,
        name: 'Facebook'
      },
      {
        providerId: 'github.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#24292e',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <GitHubCircleIcon className={classes.icon} />,
        name: 'GitHub'
      },
      {
        providerId: 'google.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#4285f4',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <GoogleIcon className={classes.icon} />,
        name: 'Google'
      },
      {
        providerId: 'microsoft.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#f65314',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <MicrosoftIcon className={classes.icon} />,
        name: 'Microsoft'
      },
      {
        providerId: 'twitter.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#1da1f2',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <TwitterIcon className={classes.icon} />,
        name: 'Twitter'
      },
      {
        providerId: 'yahoo.com',
        theme: createMuiTheme({
          palette: {
            primary: {
              main: '#410093',
              contrastText: '#ffffff'
            }
          }
        }),
        icon: <YahooIcon className={classes.icon} />,
        name: 'Yahoo'
      }
    ];

    return (
      <Dialog fullWidth maxWidth="sm" {...dialogProps} onKeyPress={this.handleKeyPress} onExited={this.handleExited}>
        <DialogTitle>
          Sign in to your account
        </DialogTitle>

        <DialogContent>
          <Hidden xsDown>
            <Grid container direction="row">
              <Grid item xs={4}>
                <Grid container direction="column" spacing={1}>
                  {authProviders.map((authProvider) => {
                    if (!settings.authProviders.includes(authProvider.providerId)) {
                      return null;
                    }

                    return (
                      <Grid key={authProvider.providerId} item>
                        <MuiThemeProvider theme={authProvider.theme}>
                          <Button
                            color="primary"
                            disabled={isPerformingAuthAction}
                            fullWidth
                            variant="contained"
                            onClick={() => onAuthProviderClick(authProvider.providerId)}>
                            {authProvider.icon}
                            {authProvider.name}
                          </Button>
                        </MuiThemeProvider>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>

              <Grid item xs={1}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={7}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs>
                    <TextField
                      autoComplete="email"
                      error={!!(errors && errors.emailAddress)}
                      fullWidth
                      helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                      label="E-mail address"
                      required
                      type="email"
                      value={emailAddress}
                      variant="outlined"

                      onChange={this.handleEmailAddressChange}
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      autoComplete="current-password"
                      error={!!(errors && errors.password)}
                      fullWidth
                      helperText={(errors && errors.password) ? errors.password[0] : ''}
                      label="Password"
                      required
                      type="password"
                      value={password}
                      variant="outlined"

                      onChange={this.handlePasswordChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Grid className={classes.grid} container direction="column" spacing={1}>
              {authProviders.map((authProvider) => {
                if (!settings.authProviders.includes(authProvider.providerId)) {
                  return null;
                }

                return (
                  <Grid key={authProvider.providerId} item>
                    <MuiThemeProvider theme={authProvider.theme}>
                      <Button
                        color="primary"
                        disabled={isPerformingAuthAction}
                        fullWidth
                        variant="contained"
                        onClick={() => onAuthProviderClick(authProvider.providerId)}>
                        {authProvider.icon}
                        {authProvider.name}
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                );
              })}
            </Grid>

            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  autoComplete="email"
                  error={!!(errors && errors.emailAddress)}
                  fullWidth
                  helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                  label="E-mail address"
                  required
                  type="email"
                  value={emailAddress}
                  variant="outlined"

                  onChange={this.handleEmailAddressChange}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  autoComplete="current-password"
                  error={!!(errors && errors.password)}
                  fullWidth
                  helperText={(errors && errors.password) ? errors.password[0] : ''}
                  label="Password"
                  required
                  type="password"
                  value={password}
                  variant="outlined"

                  onChange={this.handlePasswordChange}
                />
              </Grid>
            </Grid>
          </Hidden>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={dialogProps.onClose}>Cancel</Button>

          <Button
            color="primary"
            disabled={!emailAddress || isPerformingAuthAction}
            variant="outlined"

            onClick={this.resetPassword}>
            Reset password
          </Button>

          <Button
            color="primary"
            disabled={(!emailAddress || !password) || isPerformingAuthAction}
            variant="contained"

            onClick={this.signIn}>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignInDialog.propTypes = {

  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  isPerformingAuthAction: PropTypes.bool.isRequired,

  // Custom Functions
  resetPassword: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,

  // Custom Events
  onAuthProviderClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SignInDialog);