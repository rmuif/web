import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import FindIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';

import EmptyState from '../EmptyState';

const styles = (theme) => ({
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

class NotFoundContent extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    return (
      <EmptyState
        icon={<FindIcon />}
        title="Content Not Found"
        description="The requested URL was not found on this server"
        button={
          <Fab color="secondary" component={Link} to="/" variant="extended">
            <HomeIcon className={classes.buttonIcon} /> Go Home
          </Fab>
        }
      />
    );
  }
}

NotFoundContent.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFoundContent);
