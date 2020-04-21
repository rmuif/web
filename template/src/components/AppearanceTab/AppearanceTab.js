import React, { Component } from "react";

import PropTypes from "prop-types";

import {
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Hidden,
  Checkbox,
  Switch,
  Button,
} from "@material-ui/core";

import {
  FiberManualRecord as FiberManualRecordIcon,
  Brightness4 as Brightness4Icon,
  FormatColorReset as FormatColorResetIcon,
} from "@material-ui/icons";

import appearance from "../../services/appearance";

class AppearanceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false,
      primaryColorLabelWidth: 0,
      secondaryColorLabelWidth: 0,
    };

    this.primaryColorLabel = React.createRef();
    this.secondaryColorLabel = React.createRef();
  }

  handlePrimaryColorChange = (event) => {
    if (!event) {
      return;
    }

    const primaryColor = event.target.value;

    if (!primaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.primaryColor.id === primaryColor) {
      return;
    }

    this.setState(
      {
        performingAction: true,
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: primaryColor,
            secondaryColor: theme.secondaryColor.id,
            dark: theme.dark,
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  handleSecondaryColorChange = (event) => {
    if (!event) {
      return;
    }

    const secondaryColor = event.target.value;

    if (!secondaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.secondaryColor.id === secondaryColor) {
      return;
    }

    this.setState(
      {
        performingAction: true,
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: theme.primaryColor.id,
            secondaryColor: secondaryColor,
            dark: theme.dark,
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  handleDarkModeChange = (event) => {
    if (!event) {
      return;
    }

    const dark = event.target.checked;

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.dark === dark) {
      return;
    }

    this.setState(
      {
        performingAction: true,
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: theme.primaryColor.id,
            secondaryColor: theme.secondaryColor.id,
            dark: dark,
          })
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  handleResetThemeClick = () => {
    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (appearance.isDefaultTheme(theme)) {
      return;
    }

    this.setState(
      {
        performingAction: true,
      },
      () => {
        appearance
          .resetTheme()
          .catch((reason) => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false,
            });
          });
      }
    );
  };

  render() {
    // Properties
    const { theme } = this.props;

    if (!theme) {
      return null;
    }

    const {
      performingAction,
      primaryColorLabelWidth,
      secondaryColorLabelWidth,
    } = this.state;

    return (
      <DialogContent>
        <List disablePadding>
          <Box mb={1}>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <FiberManualRecordIcon color="primary" />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel ref={this.primaryColorLabel}>
                  Primary color
                </InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.primaryColor.id}
                    labelWidth={primaryColorLabelWidth}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(appearance.colors).map((color) => {
                      color = appearance.colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.primaryColor.id}
                    labelWidth={primaryColorLabelWidth}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(appearance.colors).map((color) => {
                      color = appearance.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>
                          {color.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <Box mb={1}>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <FiberManualRecordIcon color="secondary" />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel ref={this.secondaryColorLabel}>
                  Secondary color
                </InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.secondaryColor.id}
                    labelWidth={secondaryColorLabelWidth}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(appearance.colors).map((color) => {
                      color = appearance.colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.secondaryColor.id}
                    labelWidth={secondaryColorLabelWidth}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(appearance.colors).map((color) => {
                      color = appearance.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>
                          {color.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Dark mode"
              secondary="Displays mostly dark surfaces"
            />

            <ListItemSecondaryAction>
              <Hidden xsDown>
                <Checkbox
                  color="primary"
                  checked={theme.dark}
                  onChange={this.handleDarkModeChange}
                />
              </Hidden>

              <Hidden smUp>
                <Switch
                  color="primary"
                  checked={theme.dark}
                  onChange={this.handleDarkModeChange}
                />
              </Hidden>
            </ListItemSecondaryAction>
          </ListItem>

          <Box mt={2} mb={1}>
            <Divider light />
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <FormatColorResetIcon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Reset theme"
              secondary={
                appearance.isDefaultTheme(theme)
                  ? "No changes made"
                  : "Changes will be reset"
              }
            />

            <ListItemSecondaryAction>
              <Button
                color="secondary"
                disabled={appearance.isDefaultTheme(theme) || performingAction}
                variant="contained"
                onClick={this.handleResetThemeClick}
              >
                Reset
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    );
  }

  componentDidMount() {
    this.setState({
      primaryColorLabelWidth: this.primaryColorLabel.current.offsetWidth,
      secondaryColorLabelWidth: this.secondaryColorLabel.current.offsetWidth,
    });
  }
}

AppearanceTab.propTypes = {
  // Properties
  theme: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default AppearanceTab;
