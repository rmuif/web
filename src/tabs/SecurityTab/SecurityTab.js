import React, { Component } from 'react'

import PropTypes from 'prop-types'

import validate from 'validate.js';
import moment from 'moment';

import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';

import constraints from '../../constraints';
import authentication from '../../authentication';

const initialState = {
  securityRating: 0,

  showingField: '',

  password: '',
  passwordConfirmation: '',

  isPerformingAuthAction: false,

  errors: null
};

class SecurityTab extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  calculateSecurityRating = () => {
    const { user, userData } = this.props;

    if (!user || !user.metadata || !userData) {
      return;
    }

    let creationTime = user.metadata.creationTime;
    let lastChangedPassword = userData.lastChangedPassword;

    if (!creationTime) {
      return;
    }

    creationTime = moment(creationTime);
    
    if (lastChangedPassword) {
      lastChangedPassword = moment(lastChangedPassword.toDate());

      if (creationTime.diff(lastChangedPassword, 'days') >= 365.242199) {
        this.setState({
          securityRating: 50
        });
      } else {
        this.setState({
          securityRating: 100
        });
      }
    } else {
      if (moment().diff(creationTime, 'days') >= 365.242199) {
        this.setState({
          securityRating: 50
        });
      } else {
        this.setState({
          securityRating: 100
        });
      }
    }
  };

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId
    });
  };

  hideFields = (callback) => {
    this.setState({
      showingField: '',

      password: '',
      passwordConfirmation: '',

      errors: null
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  changeField = (fieldId) => {
    switch (fieldId) {
      case 'password':
        const { password } = this.state;

        const errors = validate({
          password: password
        }, {
          password: constraints.password
        });

        if (errors) {
          this.setState({
            errors: errors
          });

          return;
        }

        this.setState({
          errors: null
        }, () => {
          this.showField('password-confirmation');
        });
        return;

      case 'password-confirmation':
        this.changePassword();
        return;

      default:
        return;
    }
  };

  changePassword = () => {
    const { password, passwordConfirmation } = this.state;

    const errors = validate({
      password: password,
      passwordConfirmation: passwordConfirmation
    }, {
      password: constraints.password,
      passwordConfirmation: constraints.passwordConfirmation
    });

    if (errors) {
      this.setState({
        errors: errors
      });

      return;
    }

    this.setState({
      errors: null
    }, () => {
      this.setState({
        isPerformingAuthAction: true
      }, () => {
        authentication.changePassword(password).then(() => {
          this.hideFields(() => {
            this.props.openSnackbar('Changed password');
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            isPerformingAuthAction: false
          });
        });
      });
    });
  };

  handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === 'Escape') {
      this.hideFields();
    } else if (key === 'Enter') {
      this.changeField(fieldId);
    }
  };

  handlePasswordChange = (event) => {
    if (!event) {
      return;
    }

    const password = event.target.value;

    this.setState({
      password: password
    });
  };

  handlePasswordConfirmationChange = (event) => {
    if (!event) {
      return;
    }

    const passwordConfirmation = event.target.value;

    this.setState({
      passwordConfirmation: passwordConfirmation
    });
  };

  render() {
    // Properties
    const { userData } = this.props;

    const {
      securityRating,

      showingField,

      password,
      passwordConfirmation,

      isPerformingAuthAction,

      errors
    } = this.state;

    return (
      <DialogContent>
        <Box textAlign="center">
          <Typography variant="body1">Security Rating</Typography>

          {securityRating === 0 &&
            <Typography color="error" variant="h5">{securityRating}%</Typography>
          }

          {securityRating === 100 &&
            <Typography color="primary" variant="h5">{securityRating}%</Typography>
          }

          {(securityRating !== 0 && securityRating !== 100) &&
            <Typography color="secondary" variant="h5">{securityRating}%</Typography>
          }
        </Box>

        <List disablePadding>
          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
            </Hidden>

            {showingField === 'password' &&
              <TextField
                autoComplete="new-password"
                autoFocus
                disabled={isPerformingAuthAction}
                error={!!(errors && errors.password)}
                fullWidth
                helperText={(errors && errors.password) ? errors.password[0] : 'Press Enter to change your password'}
                label="Password"
                required
                type="password"
                value={password}
                variant="filled"

                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, 'password')}

                onChange={this.handlePasswordChange}
              />
            }

            {showingField === 'password-confirmation' &&
              <TextField
                autoComplete="new-password"
                autoFocus
                disabled={isPerformingAuthAction}
                error={!!(errors && errors.passwordConfirmation)}
                fullWidth
                helperText={(errors && errors.passwordConfirmation) ? errors.passwordConfirmation[0] : 'Press Enter to change your password'}
                label="Password confirmation"
                required
                type="password"
                value={passwordConfirmation}
                variant="filled"

                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, 'password-confirmation')}

                onChange={this.handlePasswordConfirmationChange}
              />
            }

            {(showingField !== 'password' && showingField !== 'password-confirmation') &&
              <React.Fragment>
                <ListItemText
                  primary="Password"
                  secondary={userData.lastChangedPassword ? `Last changed ${moment(userData.lastChangedPassword.toDate()).format('LLL')}` : 'Never changed'}
                />

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <div>
                      <IconButton disabled={isPerformingAuthAction} onClick={() => this.showField('password')}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </Tooltip>
                </ListItemSecondaryAction>
              </React.Fragment>
            }
          </ListItem>
        </List>
      </DialogContent>
    )
  }

  componentDidMount() {
    this.calculateSecurityRating();
  }
}

SecurityTab.propTypes = {
  // Properties
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default SecurityTab;