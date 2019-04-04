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
    const { classes, icon, text } = this.props;

    return (
      <div className={classes.center}>
        {icon}
        <Typography color="textSecondary" variant="h4">{text}</Typography>
      </div>
    );
  }
}

EmptyState.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

export default withStyles(styles)(EmptyState);