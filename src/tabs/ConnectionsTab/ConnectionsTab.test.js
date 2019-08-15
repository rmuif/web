import React from 'react';

import ReactDOM from 'react-dom';

import ConnectionsTab from './ConnectionsTab';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <ConnectionsTab
        dialogProps={{
          open: true,

          onClose: () => {}
        }}

        openSnackbar={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});