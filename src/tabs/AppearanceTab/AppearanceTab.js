import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import theming from '../../theming';

const styles = (theme) => ({
  primaryColorAvatar: {
    backgroundColor: theme.palette.primary.main
  },

  secondaryColorAvatar: {
    backgroundColor: theme.palette.secondary.main
  }
});

class AppearanceTab extends Component {
  render() {
    // Properties
    const { classes } = this.props;

    return (
      <DialogContent>
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.primaryColorAvatar} />
            </ListItemAvatar>

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
            <ListItemAvatar>
              <Avatar className={classes.secondaryColorAvatar} />
            </ListItemAvatar>

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
        </List>
      </DialogContent>
    )
  }
}

AppearanceTab.propTypes = {
  // Properties
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppearanceTab);
