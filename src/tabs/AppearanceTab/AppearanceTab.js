import React, { Component } from 'react'

import PropTypes from 'prop-types'

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PaletteIcon from '@material-ui/icons/Palette';

import theming from '../../theming';

class AppearanceTab extends Component {
  render() {
    return (
      <DialogContent>
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <Box bgcolor="primary.main" clone>
                <Avatar />
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary="Primary color"
              secondary={theming.currentTheme.primaryColor.name}
            />

            <ListItemSecondaryAction>
              <Tooltip title="Palette">
                <IconButton>
                  <PaletteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Box bgcolor="secondary.main" clone>
                <Avatar />
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary="Secondary color"
              secondary={theming.currentTheme.secondaryColor.name}
            />

            <ListItemSecondaryAction>
              <Tooltip title="Palette">
                <IconButton>
                  <PaletteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    )
  }
}

AppearanceTab.propTypes = {

};

export default AppearanceTab;