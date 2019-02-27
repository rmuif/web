import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AppearanceTab extends Component {
  render() {
    // Properties
    const { colors, primaryColor, secondaryColor } = this.props;

    // Events
    const { onPrimaryColorChange, onSecondaryColorChange } = this.props;

    return (
      <div>
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
      </div>
      );
  }
}

export default AppearanceTab;