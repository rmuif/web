import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

import EmptyState from '../layout/EmptyState';

const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: `${theme.spacing.unit * 12}px`
  }
});

class HomeContent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <EmptyState
        icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
        text="Home"
      />
    );
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContent);