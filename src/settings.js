import colors from './colors';

const settings = {
  title: 'React + Material-UI + Firebase',

  theme: {
    primaryColor: colors.blue,
    secondaryColor: colors.red,
    dark: false
  },

  credentials: {
    firebase: {
      apiKey: 'AIzaSyDYZOrZVpXkPQD6J31mb9t2eIIxmGEJK-Q',
      authDomain: 'react-material-ui-firebase.firebaseapp.com',
      databaseURL: 'https://react-material-ui-firebase.firebaseio.com',
      projectId: 'react-material-ui-firebase',
      storageBucket: 'react-material-ui-firebase.appspot.com',
      messagingSenderId: '552659850812',
      appId: '1:552659850812:web:d685f74f72161d96'
    }
  },

  authProviders: [
    'facebook.com',
    'github.com',
    'google.com',
    'microsoft.com',
    'twitter.com',
    'yahoo.com'
  ]
};

export default settings;