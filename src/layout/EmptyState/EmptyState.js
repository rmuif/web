import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = {
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

class EmptyState extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { icon, title, description, button } = this.props;

    return (
      <div className={classes.center}>
        {icon}
        {title && <Typography color="textSecondary" variant="h4">{title}</Typography>}
        {description && <Typography color="textSecondary" variant="subtitle1">{description}</Typography>}
        {button}
      </div>
    );
  }
}

EmptyState.propTypes = {
  classes: PropTypes.object.isRequired,

  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element
};

export default withStyles(styles)(EmptyState);