import React, {Component} from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

class LaunchScreen extends Component {
  render() {
    return (
      <Box position="absolute" top="50%" left="50%">
        <CircularProgress />
      </Box>
    );
  }
}

LaunchScreen.propTypes = {};

export default LaunchScreen;
