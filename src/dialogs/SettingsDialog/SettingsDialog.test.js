import React from 'react';

import ReactDOM from 'react-dom';

import SettingsDialog from './SettingsDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <SettingsDialog
        dialogProps={{
          open: true,

          onClose: () => {}
        }}

        user={{}}
        userData={{}}

        openSnackbar={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});