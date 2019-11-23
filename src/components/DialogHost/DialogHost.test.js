import React from 'react';

import ReactDOM from 'react-dom';

import DialogHost from './DialogHost';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <DialogHost
        dialogs={{
          aboutDialog: {
            dialogProps: {
              open: false
            }
          },
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
