import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme) => ({
  dialogContentText: {
    marginTop: `${theme.spacing.unit * 2}px`
  }
});

class AppearanceTab extends Component {
  render() {
    // Properties
    const { classes, colors, types, primaryColor, secondaryColor, type } = this.props;

    // Events
    const { onPrimaryColorChange, onSecondaryColorChange, onTypeChange } = this.props;

    return (
      <React.Fragment>
        <DialogContentText className={classes.dialogContentText}>
          Customize the look and feel to your own liking.
          You can reset all changes you've made by clicking Reset.
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

export default withStyles(styles)(AppearanceTab);