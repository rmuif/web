import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },

  icon: {
    fontSize: theme.spacing(12)
  }
});

class EmptyState extends Component {
  getMarginBottomForSection(section) {
    if (!section) {
      return 0;
    }

    const { title, description, button } = this.props;

    switch (section) {
      case 'icon':
        if (title || description || button) {
          return 1;
        }

        return 0;

      case 'title':
        if (description && button) {
          return 1;
        }

        if (!description && button) {
          return 2;
        }

        if (description && !button) {
          return 1;
        }

        return 0;

      case 'description':
        if (button) {
          return 2;
        }

        return 0;

      default:
        return 0;
    }
  }

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { icon, title, description, button } = this.props;

    return (
      <div className={classes.center}>
        {icon &&
          <Box mb={this.getMarginBottomForSection('icon')}>
            <SvgIcon className={classes.icon} color="action">
              {icon}
            </SvgIcon>
          </Box>
        }

        {title &&
          <Box mb={this.getMarginBottomForSection('title')}>
            <Typography color="textSecondary" variant="h4">{title}</Typography>
          </Box>
        }

        {description &&
          <Box mb={this.getMarginBottomForSection('description')}>
            <Typography color="textSecondary" variant="subtitle1">{description}</Typography>
          </Box>
        }

        {button &&
          <Box>
            {button}
          </Box>
        }
      </div>
    );
  }
}

EmptyState.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element
};

export default withStyles(styles)(EmptyState);
