import React from 'react';

import ReactDOM from 'react-dom';

import DialogHost from './DialogHost';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <DialogHost
        signedIn={false}
        dialogs={{
          signUpDialog: {},
          signInDialog: {},
          settingsDialog: {},
          signOutDialog: {}
        }}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});