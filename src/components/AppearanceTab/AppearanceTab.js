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
import Button from '@material-ui/core/Button';

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';

import theming from '../../services/theming.alt';

class AppearanceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false
    };
  }

  handlePrimaryColorChange = (event) => {
    const primaryColor = event.target.value;

    // TODO: Check if primary color is current primary color

    this.setState({
      performingAction: true
    }, () => {
      theming.changePrimaryColor(primaryColor).then((value) => {
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
    const secondaryColor = event.target.value;

    // TODO: Check if primary color is current primary color

    this.setState({
      performingAction: true
    }, () => {
      theming.changeSecondaryColor(secondaryColor).then((value) => {
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
    const type = event.target.value;

    // TODO: Check if primary color is current primary color

    this.setState({
      performingAction: true
    }, () => {
      theming.changeType(type).then((value) => {
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
    // TODO: Check if current theme is default theme

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

    const { performingAction } = this.state;

    const colors = Object.keys(theming.colors).map((color) => {
      color = theming.colors[color];

      return (
        <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
      );
    });

    const types = Object.keys(theming.types).map((type) => {
      type = theming.types[type];

      return (
        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
      );
    });

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
                <Select
                  value={theme.primaryColor.id}

                  onChange={this.handlePrimaryColorChange}>
                  {colors}
                </Select>
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
                <Select
                  value={theme.secondaryColor.id}

                  onChange={this.handleSecondaryColorChange}>
                  {colors}
                </Select>
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
                <Select
                  value={theme.type.id}

                  onChange={this.handleTypeChange}>
                  {types}
                </Select>
              </FormControl>
            </ListItem>
          </Box>

          <Box mt={2} mb={1}>
            <Divider light />
          </Box>

          <ListItem>
            <ListItemIcon>
              <FormatColorResetIcon />
            </ListItemIcon>

            <ListItemText
              primary="Reset theme"
              secondary="Changes to the theme will be reset"
            />

            <ListItemSecondaryAction>
              <Button color="secondary" disabled={performingAction} variant="contained" onClick={this.handleResetClick}>Reset</Button>
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
