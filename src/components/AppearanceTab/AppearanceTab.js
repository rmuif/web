import React, { Component } from 'react';

import PropTypes from 'prop-types';

import DialogContent from '@material-ui/core/DialogContent';

import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';

import theming from '../../services/theming';

class AppearanceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false
    };
  }

  handlePrimaryColorChange = (event) => {
    if (!event) {
      return;
    }

    const primaryColor = event.target.value;

    if (!primaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.primaryColor.id === primaryColor) {
      return;
    }

    this.setState({
      performingAction: true
    }, () => {
      theming.changeTheme({
        primaryColor: primaryColor,
        secondaryColor: theme.secondaryColor.id,
        type: theme.type.id
      }).then((value) => {
        this.props.openSnackbar('Changed primary color');
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
          performingAction: false
        });
      });
    });
  };

  handleSecondaryColorChange = (event) => {
    if (!event) {
      return;
    }

    const secondaryColor = event.target.value;

    if (!secondaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.secondaryColor.id === secondaryColor) {
      return;
    }

    this.setState({
      performingAction: true
    }, () => {
      theming.changeTheme({
        primaryColor: theme.primaryColor.id,
        secondaryColor: secondaryColor,
        type: theme.type.id
      }).then((value) => {
        this.props.openSnackbar('Changed secondary color');
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
          performingAction: false
        });
      });
    });
  };

  handleTypeChange = (event) => {
    if (!event) {
      return;
    }

    const type = event.target.value;

    if (!type) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.type.id === type) {
      return;
    }

    this.setState({
      performingAction: true
    }, () => {
      theming.changeTheme({
        primaryColor: theme.primaryColor.id,
        secondaryColor: theme.secondaryColor.id,
        type: type
      }).then((value) => {
        this.props.openSnackbar('Changed type');
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
          performingAction: false
        });
      });
    });
  };

  handleResetClick = () => {
    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theming.isDefaultTheme(theme)) {
      return;
    }

    this.setState({
      performingAction: true
    }, () => {
      theming.resetTheme().then((value) => {
        this.props.openSnackbar('Reset theme');
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
          performingAction: false
        });
      });
    });
  };

  render() {
    // Properties
    const { theme } = this.props;

    if (!theme) {
      return null;
    }

    const { performingAction } = this.state;

    return (
      <DialogContent>
        <List disablePadding>
          <Box mb={1}>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecord color="primary" />
              </ListItemIcon>

              <FormControl disabled={performingAction} fullWidth>
                <InputLabel>Primary color</InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.primaryColor.id}

                    onChange={this.handlePrimaryColorChange}>
                    {Object.keys(theming.colors).map((color) => {
                      color = theming.colors[color];

                      return (
                        <option key={color.id} value={color.id}>{color.name}</option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.primaryColor.id}

                    onChange={this.handlePrimaryColorChange}>
                    {Object.keys(theming.colors).map((color) => {
                      color = theming.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <Box mb={1}>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecord color="secondary" />
              </ListItemIcon>

              <FormControl disabled={performingAction} fullWidth>
                <InputLabel>Secondary color</InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.secondaryColor.id}

                    onChange={this.handleSecondaryColorChange}>
                    {Object.keys(theming.colors).map((color) => {
                      color = theming.colors[color];

                      return (
                        <option key={color.id} value={color.id}>{color.name}</option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.secondaryColor.id}

                    onChange={this.handleSecondaryColorChange}>
                    {Object.keys(theming.colors).map((color) => {
                      color = theming.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <Box mb={1}>
            <ListItem>
              <ListItemIcon>
                <InvertColorsIcon />
              </ListItemIcon>

              <FormControl disabled={performingAction} fullWidth>
                <InputLabel>Type</InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.type.id}

                    onChange={this.handleTypeChange}>
                    {Object.keys(theming.types).map((type) => {
                      type = theming.types[type];

                      return (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.type.id}

                    onChange={this.handleTypeChange}>
                    {Object.keys(theming.types).map((type) => {
                      type = theming.types[type];

                      return (
                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <Box mt={2} mb={1}>
            <Divider light />
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <FormatColorResetIcon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Reset theme"
              secondary="Changes will be reset"
            />

            <ListItemSecondaryAction>
              <Button
                color="secondary"
                disabled={theming.isDefaultTheme(theme) || performingAction}
                variant="contained"

                onClick={this.handleResetClick}>
                Reset
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    )
  }
}

AppearanceTab.propTypes = {
  // Properties
  theme: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default AppearanceTab;
