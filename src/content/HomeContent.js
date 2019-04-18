import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';

import EmptyState from '../layout/EmptyState';

const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: `${theme.spacing.unit * 12}px`
  },

  button: {
    marginTop: `${theme.spacing.unit}px`
  }
});

class HomeContent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <EmptyState
        icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
        title="Home"
        description="Use React + Material-UI + Firebase as the starting-point for your project"
        button={
          <Fab className={classes.button} color="primary" component={Link} to="/some-magic" variant="extended">
            Click For Some Magic
          </Fab>
        }
      />
    );
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContent);