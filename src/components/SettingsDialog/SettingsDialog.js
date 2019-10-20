import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaletteIcon from '@material-ui/icons/Palette';
import LinkIcon from '@material-ui/icons/Link';
import SecurityIcon from '@material-ui/icons/Security';

import SwipeableViews from 'react-swipeable-views';

import AccountTab from '../AccountTab';
import AppearanceTab from '../AppearanceTab';
import LinksTab from '../LinksTab';
import SecurityTab from '../SecurityTab';

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },

  tabs: {
    display: 'initial'
  }
});

const tabs = [
  {
    key: 'account',
    icon: <AccountCircleIcon />,
    label: 'Account'
  },

  {
    key: 'appearance',
    icon: <PaletteIcon />,
    label: 'Appearance'
  },

  {
    key: 'links',
    icon: <LinkIcon />,
    label: 'Links'
  },

  {
    key: 'security',
    icon: <SecurityIcon />,
    label: 'Security'
  }
];

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0
    };
  }

  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value
    });
  };

  handleIndexChange = (index) => {
    this.setState({
      selectedTab: index
    });
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const {
      user,
      userData,
      theme
    } = this.props;

    // Custom Functions
    const {
      openSnackbar
    } = this.props;

    // Custom Functions
    const {
      onDeleteAccountClick
    } = this.props;

    const { selectedTab } = this.state;

    return (
      <Dialog {...dialogProps}>
        <DialogTitle disableTypography>
          <Typography variant="h6">
            Settings
          </Typography>

          <Tooltip title="Close">
            <IconButton className={classes.closeButton} onClick={dialogProps.onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <Hidden xsDown>
          <Tabs
            classes={{ root: classes.tabs }}
            style={{ overflow: 'initial', minHeight: 'initial' }}

            indicatorColor="primary"
            textColor="primary"
            value={selectedTab}
            variant="fullWidth"
            onChange={this.handleTabChange}>
            {tabs.map((tab) => {
              return (
                <Tab key={tab.key} icon={tab.icon} label={tab.label} />
              );
            })}
          </Tabs>
        </Hidden>

        <Hidden smUp>
          <Tabs
            classes={{ root: classes.tabs }}
            style={{ overflow: 'initial', minHeight: 'initial' }}

            indicatorColor="primary"
            scrollButtons="off"
            textColor="primary"
            value={selectedTab}
            variant="scrollable"
            onChange={this.handleTabChange}>
            {tabs.map((tab) => {
              return (
                <Tab key={tab.key} icon={tab.icon} label={tab.label} />
              );
            })}
          </Tabs>
        </Hidden>

        <SwipeableViews index={selectedTab} onChangeIndex={this.handleIndexChange}>
          <AccountTab
            user={user}
            userData={userData}

            openSnackbar={openSnackbar}

            onDeleteAccountClick={onDeleteAccountClick}
          />

          <AppearanceTab
            theme={theme}

            openSnackbar={openSnackbar}
          />

          <LinksTab
            theme={theme}

            openSnackbar={openSnackbar}
          />

          <SecurityTab
            user={user}
            userData={userData}

            openSnackbar={openSnackbar}
          />
        </SwipeableViews>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

  // Custom Functions
  openSnackbar: PropTypes.func.isRequired,

  // Custom Events
  onDeleteAccountClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsDialog);
