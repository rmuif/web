import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Initialize Firebase
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(config);

const title = 'React + Material-UI + Firebase';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      user: null
    };
  }

  render() {
    const { isSignedIn } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar color="primary" position="static">
          <Toolbar variant="regular">
            <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{title}</Typography>

            {!isSignedIn && <Button color="secondary" variant="contained">Sign in</Button>}
            {isSignedIn && <Button color="secondary" variant="contained">Sign out</Button>}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.removeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignedIn: !!user,
        user
      });
    });
  }

  componentWillUnmount() {
    this.removeAuthObserver();
  }
}

export default App;
