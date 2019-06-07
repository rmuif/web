import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
});

class LaunchScreen extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    return (
      <CircularProgress className={classes.circularProgress} />
    );
  }
}

LaunchScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LaunchScreen);