import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(0)
  }
});

const types = [
  'light',
  'dark'
];

class AppearanceTab extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { colors, primaryColor, secondaryColor, type } = this.props;

    // Events
    const { onPrimaryColorChange, onSecondaryColorChange, onTypeChange } = this.props;

    return (
      <React.Fragment>
        <DialogContentText classes={{ root: classes.root }}>
          The app's primary and secondary colors, and their variants, help create a color theme that is harmonious,
          ensures accessible text, and distinguishes UI elements and surfaces from one another.
        </DialogContentText>

        <FormControl fullWidth margin="normal">
          <InputLabel>Primary color</InputLabel>

          <Select onChange={onPrimaryColorChange} value={primaryColor}>
            {colors.map((color) => {
              return (<MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>);
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Secondary color</InputLabel>

          <Select onChange={onSecondaryColorChange} value={secondaryColor}>
            {colors.map((color) => {
              return (<MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>);
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>

          <Select onChange={onTypeChange} value={type}>
            {types.map((type, index) => {
              return (<MenuItem key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>);
            })}
          </Select>
        </FormControl>
      </React.Fragment>
    );
  }
}

AppearanceTab.propTypes = {
  classes: PropTypes.object.isRequired,

  colors: PropTypes.array.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  onPrimaryColorChange: PropTypes.func.isRequired,
  onSecondaryColorChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired
};

export default withStyles(styles)(AppearanceTab);