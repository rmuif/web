import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
});

class AboutDialog extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Dialog Properties
    const { dialogProps } = this.props;

    // Custom Properties
    const { user } = this.props;

    return (
      <Dialog {...dialogProps}>
        <DialogTitle disableTypography>
          <Typography variant="h6">About</Typography>

          <Tooltip title="Close">
            <IconButton
              className={classes.closeButton}
              onClick={dialogProps.onClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <DialogContent>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary="Version"
                secondary={process.env.REACT_APP_VERSION}
              />
            </ListItem>

            {user && (
              <ListItem>
                <ListItemText primary="UID" secondary={user.uid} />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

AboutDialog.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Dialog Properties
  dialogProps: PropTypes.object.isRequired,

  // Custom Properties
  user: PropTypes.object
};

export default withStyles(styles)(AboutDialog);
