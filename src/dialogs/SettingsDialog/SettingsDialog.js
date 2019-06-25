import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaletteIcon from '@material-ui/icons/Palette';
import LinkIcon from '@material-ui/icons/Link';
import SecurityIcon from '@material-ui/icons/Security';

import SwipeableViews from 'react-swipeable-views';

import AccountTab from '../../tabs/AccountTab/AccountTab';

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
    key: 'connections',
    icon: <LinkIcon />,
    label: 'Connections'
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
    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const {
      user,
      userData
    } = this.props;

    const { selectedTab } = this.state;

    return (
      <Dialog {...dialogProps}>
        <DialogTitle>
          Settings
        </DialogTitle>

        <Tabs indicatorColor="primary" textColor="primary" value={selectedTab} onChange={this.handleTabChange}>
          {tabs.map((tab) => {
            return (
              <Tab key={tab.key} icon={tab.icon} label={tab.label} />
            );
          })}
        </Tabs>

        <Hidden xsDown>
          {selectedTab === 0 &&
            <AccountTab
              user={user}
              userData={userData}
            />
          }
        </Hidden>

        <Hidden smUp>
          <SwipeableViews index={selectedTab} onChangeIndex={this.handleIndexChange}>
            <AccountTab
              user={user}
              userData={userData}
            />
          </SwipeableViews>
        </Hidden>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

export default SettingsDialog;