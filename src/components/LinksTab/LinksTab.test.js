import React from 'react';

import ReactDOM from 'react-dom';

import LinksTab from './LinksTab';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <LinksTab
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
