import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const title = 'React + Material-UI + Firebase';

class App extends Component {
  render() {
    return (
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{title}</Typography>

          <Button color="secondary" variant="contained">Sign in</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default App;
