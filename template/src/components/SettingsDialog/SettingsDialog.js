import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import {
  Dialog,
  DialogTitle,
  Typography,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
  Palette as PaletteIcon,
  Link as LinkIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";

import SwipeableViews from "react-swipeable-views";

import AccountTab from "../AccountTab";
import AppearanceTab from "../AppearanceTab";
import LinksTab from "../LinksTab";
import SecurityTab from "../SecurityTab";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  tabs: {
    display: "initial",
  },
});

const tabs = [
  {
    key: "account",
    icon: <AccountCircleIcon />,
    label: "Account",
  },

  {
    key: "appearance",
    icon: <PaletteIcon />,
    label: "Appearance",
  },

  {
    key: "links",
    icon: <LinkIcon />,
    label: "Links",
  },

  {
    key: "security",
    icon: <SecurityIcon />,
    label: "Security",
  },
];

const initialState = {
  selectedTab: 0,
};

class SettingsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleExited = () => {
    this.setState(initialState);
  };

  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value,
    });
  };

  handleIndexChange = (index) => {
    this.setState({
      selectedTab: index,
    });
  };

  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { user, userData, theme } = this.props;

    // Custom Functions
    const { openSnackbar } = this.props;

    // Custom Functions
    const { onDeleteAccountClick } = this.props;

    const { selectedTab } = this.state;

    return (
      <Dialog {...dialogProps} onExited={this.handleExited}>
        <DialogTitle disableTypography>
          <Typography variant="h6">Settings</Typography>

          <Tooltip title="Close">
            <IconButton
              className={classes.closeButton}
              onClick={dialogProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <Tabs
          classes={{ root: classes.tabs }}
          style={{ overflow: "initial", minHeight: "initial" }}
          indicatorColor="primary"
          textColor="primary"
          value={selectedTab}
          variant="fullWidth"
          onChange={this.handleTabChange}
        >
          {tabs.map((tab) => {
            return <Tab key={tab.key} icon={tab.icon} label={tab.label} />;
          })}
        </Tabs>

        <SwipeableViews
          index={selectedTab}
          onChangeIndex={this.handleIndexChange}
        >
          <AccountTab
            user={user}
            userData={userData}
            openSnackbar={openSnackbar}
            onDeleteAccountClick={onDeleteAccountClick}
          />

          <AppearanceTab theme={theme} openSnackbar={openSnackbar} />

          <LinksTab theme={theme} openSnackbar={openSnackbar} />

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
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object,

  // Custom Functions
  openSnackbar: PropTypes.func.isRequired,

  // Custom Events
  onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SettingsDialog);
