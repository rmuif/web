import React, { Component } from 'react'

import PropTypes from 'prop-types'

import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

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
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Box bgcolor="secondary.main" clone>
                <Avatar />
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary="Secondary color"
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Box bgcolor="background.default" clone>
                <Avatar />
              </Box>
            </ListItemAvatar>

            <ListItemText
              primary="Dark theme"
            />
          </ListItem>
        </List>
      </DialogContent>
    )
  }
}

AppearanceTab.propTypes = {

};

export default AppearanceTab;