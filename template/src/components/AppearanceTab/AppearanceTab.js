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
} from "@mui/material";

import {
  FiberManualRecord as FiberManualRecordIcon,
  Brightness4 as Brightness4Icon,
  FormatColorReset as FormatColorResetIcon,
} from "@mui/icons-material";

import { ThemeContext } from "../../context/ThemeContext";

class AppearanceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false,
    };
  }

  handlePrimaryColorChange = (event) => {
    const { theme, setTheme } = this.context;

    if (!event) {
      return;
    }

    const primaryColor = event.target.value;

    if (!primaryColor) {
      return;
    }

    if (!theme) {
      return;
    }

    if (theme.primaryColor.id === primaryColor) {
      return;
    }

    this.setState({ performingAction: true }, () => {
      setTheme({
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
    });
  };

  handleSecondaryColorChange = (event) => {
    const { theme, setTheme } = this.context;

    if (!event) {
      return;
    }

    const secondaryColor = event.target.value;

    if (!secondaryColor) {
      return;
    }

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
        setTheme({
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
    const { theme, setTheme } = this.context;

    if (!event) {
      return;
    }

    const dark = event.target.checked;

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
        setTheme({
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
    const { theme, isDefaultTheme, resetTheme } = this.context;

    if (!theme) {
      return;
    }

    if (isDefaultTheme(theme)) {
      return;
    }

    this.setState(
      {
        performingAction: true,
      },
      () => {
        resetTheme()
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
    const { theme, colors, isDefaultTheme } = this.context;

    if (!theme) {
      return null;
    }

    const { performingAction } = this.state;

    return (
      <DialogContent>
        <List disablePadding>
          <Box mb={1}>
            <ListItem>
              <Hidden smDown>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    htmlColor={theme.palette.primary.main}
                  />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel>Primary color</InputLabel>

                <Hidden smUp>
                  <Select
                    label="Primary color"
                    native
                    value={theme.primaryColor.id}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(colors).map((color) => {
                      color = colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden smDown>
                  <Select
                    label="Primary color"
                    value={theme.primaryColor.id}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(colors).map((color) => {
                      color = colors[color];

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
              <Hidden smDown>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    htmlColor={theme.palette.secondary.main}
                  />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel>Secondary color</InputLabel>

                <Hidden smUp>
                  <Select
                    label="Secondary color"
                    native
                    value={theme.secondaryColor.id}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(colors).map((color) => {
                      color = colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden smDown>
                  <Select
                    label="Secondary color"
                    value={theme.secondaryColor.id}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(colors).map((color) => {
                      color = colors[color];

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
            <Hidden smDown>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Dark mode"
              secondary="Displays mostly dark surfaces"
            />

            <ListItemSecondaryAction>
              <Hidden smDown>
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
            <Hidden smDown>
              <ListItemIcon>
                <FormatColorResetIcon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Reset theme"
              secondary={
                isDefaultTheme(theme)
                  ? "No changes made"
                  : "Changes will be reset"
              }
            />

            <ListItemSecondaryAction>
              <Button
                color="secondary"
                disabled={isDefaultTheme(theme) || performingAction}
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
}

AppearanceTab.contextType = ThemeContext;

AppearanceTab.propTypes = {
  // Functions
  openSnackbar: PropTypes.func.isRequired,
};

export default AppearanceTab;
