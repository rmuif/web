import React, { Component } from 'react';

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import EditIcon from '@material-ui/icons/Edit';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';

import theming from '../../services/theming';

class AppearanceTab extends Component {
  handleResetClick = () => {
    theming.resetTheme();
  };

  render() {
    return (
      <DialogContent>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecord color="primary" />
            </ListItemIcon>

            <ListItemText
              primary="Primary color"
              secondary={theming.currentTheme.primaryColor.name}
            />

            <ListItemSecondaryAction>
              <Tooltip title="Change">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <FiberManualRecord color="secondary" />
            </ListItemIcon>

            <ListItemText
              primary="Secondary color"
              secondary={theming.currentTheme.secondaryColor.name}
            />

            <ListItemSecondaryAction>
              <Tooltip title="Change">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>

            <ListItemText
              primary="Dark theme"
              secondary="Low-light UI that displays mostly dark surfaces"
            />

            <ListItemSecondaryAction>
              <Hidden xsDown>
                <Checkbox />
              </Hidden>

              <Hidden smUp>
                <Switch />
              </Hidden>
            </ListItemSecondaryAction>
          </ListItem>

          <Box mt={1} mb={1}>
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
              <Button color="secondary" variant="contained" onClick={this.handleResetClick}>Reset</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    )
  }
}

AppearanceTab.propTypes = {};

export default AppearanceTab;
