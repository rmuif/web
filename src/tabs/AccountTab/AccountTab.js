import React, { Component } from 'react';

import PropTypes from 'prop-types';

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import validate from 'validate.js';
import moment from 'moment';

import constraints from '../../constraints';
import * as auth from '../../auth';

const initialState = {
  showingField: '',

  firstName: '',
  lastName: '',
  username: '',
  emailAddress: '',

  errors: null
};

class AccountTab extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId
    });
  };

  hideFields = () => {
    this.setState(initialState);
  };

  changeFirstName = () => {
    const { firstName } = this.state;

    const errors = validate({
      firstName: firstName
    }, {
      firstName: constraints.firstName
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: null
      }, () => {
        auth.changeFirstName(firstName, () => {
          this.hideFields();
        });
      });
    }
  };

  changeLastName = () => {
    const { lastName } = this.state;

    const errors = validate({
      lastName: lastName
    }, {
      lastName: constraints.lastName
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: null
      }, () => {
        auth.changeLastName(lastName, () => {
          this.hideFields();
        });
      });
    }
  };

  changeUsername = () => {
    const { username } = this.state;

    const errors = validate({
      username: username
    }, {
      username: constraints.username
    });

    if (errors) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: null
      }, () => {
        auth.changeUsername(username, () => {
          this.hideFields();
        });
      });
    }
  };

  changeEmailAddress = () => {
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
        auth.changeEmailAddress(emailAddress, () => {
          this.hideFields();
        });
      });
    }
  };

  changeField = (fieldId) => {
    switch (fieldId) {
      case 'firstName':
        this.changeFirstName();
        return;

      case 'lastName':
        this.changeLastName();
        return;

      case 'username':
        this.changeUsername();
        return;

      case 'emailAddress':
        this.changeEmailAddress();
        return;

      default:
        return;
    }
  };

  handleKeyPress = (event, fieldId) => {
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

    if (key === 'Enter') {
      this.changeField(fieldId);
    }
  };

  handleFirstNameChange = (event) => {
    if (!event) {
      return;
    }

    const firstName = event.target.value;

    this.setState({
      firstName: firstName
    });
  };

  handleLastNameChange = (event) => {
    if (!event) {
      return;
    }

    const lastName = event.target.value;

    this.setState({
      lastName: lastName
    });
  };

  handleUsernameChange = (event) => {
    if (!event) {
      return;
    }

    const username = event.target.value;

    this.setState({
      username: username
    });
  };

  handleEmailAddressChange = (event) => {
    if (!event) {
      return;
    }

    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress
    });
  };

  render() {
    // Properties
    const {
      user,
      userData
    } = this.props;

    const {
      showingField,

      firstName,
      lastName,
      username,
      emailAddress,

      errors
    } = this.state;

    return (
      <DialogContent>
        <List disablePadding>
          <ListItem>
            {showingField === 'firstName' &&
              <TextField
                autoComplete="given-name"
                autoFocus
                error={!!(errors && errors.firstName)}
                fullWidth
                helperText={(errors && errors.firstName) ? errors.firstName[0] : 'Press Enter to change your first name'}
                label="First name"
                placeholder={userData.firstName}
                required
                type="text"
                value={firstName}
                variant="filled"

                onBlur={this.hideFields}
                onKeyPress={(event) => this.handleKeyPress(event, 'firstName')}

                onChange={this.handleFirstNameChange}
              />
            }

            {showingField !== 'firstName' &&
              <React.Fragment>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>

                <ListItemText
                  primary="First name"
                  secondary={userData.firstName}
                />

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <IconButton onClick={() => this.showField('firstName')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </React.Fragment>
            }
          </ListItem>

          <ListItem>
            {showingField === 'lastName' &&
              <TextField
                autoComplete="family-name"
                autoFocus
                error={!!(errors && errors.lastName)}
                fullWidth
                helperText={(errors && errors.lastName) ? errors.lastName[0] : 'Press Enter to change your last name'}
                label="Last name"
                placeholder={userData.lastName}
                required
                type="text"
                value={lastName}
                variant="filled"

                onBlur={this.hideFields}
                onKeyPress={(event) => this.handleKeyPress(event, 'lastName')}

                onChange={this.handleLastNameChange}
              />
            }

            {showingField !== 'lastName' &&
              <React.Fragment>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Last name"
                  secondary={userData.lastName}
                />

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <IconButton onClick={() => this.showField('lastName')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </React.Fragment>
            }
          </ListItem>

          <ListItem>
            {showingField === 'username' &&
              <TextField
                autoComplete="username"
                autoFocus
                error={!!(errors && errors.username)}
                fullWidth
                helperText={(errors && errors.username) ? errors.username[0] : 'Press Enter to change your username'}
                label="Username"
                placeholder={userData.username}
                required
                type="text"
                value={username}
                variant="filled"

                onBlur={this.hideFields}
                onKeyPress={(event) => this.handleKeyPress(event, 'username')}

                onChange={this.handleUsernameChange}
              />
            }

            {showingField !== 'username' &&
              <React.Fragment>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Username"
                  secondary={userData.username}
                />

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <IconButton onClick={() => this.showField('username')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </React.Fragment>
            }
          </ListItem>

          <ListItem>
            {showingField === 'emailAddress' &&
              <TextField
                autoComplete="email"
                autoFocus
                error={!!(errors && errors.emailAddress)}
                fullWidth
                helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : 'Press Enter to change your e-mail address'}
                label="E-mail address"
                placeholder={user.email}
                required
                type="email"
                value={emailAddress}
                variant="filled"

                onBlur={this.hideFields}
                onKeyPress={(event) => this.handleKeyPress(event, 'emailAddress')}

                onChange={this.handleEmailAddressChange}
              />
            }

            {showingField !== 'emailAddress' &&
              <React.Fragment>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>

                <ListItemText
                  primary="E-mail address"
                  secondary={user.email}
                />

                <ListItemSecondaryAction>
                  <Tooltip title="Change">
                    <IconButton onClick={() => this.showField('emailAddress')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </React.Fragment>
            }
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>

            <ListItemText
              primary="Last sign-in"
              secondary={moment(user.metadata.lastSignInTime).format('LLLL')}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>

            <ListItemText
              primary="Signed up"
              secondary={moment(user.metadata.creationTime).format('LLLL')}
            />
          </ListItem>
        </List>
      </DialogContent>
    );
  }
}

AccountTab.propTypes = {
  // Properties
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

export default AccountTab;