import React from 'react';

import ReactDOM from 'react-dom';

import SecurityTab from './SecurityTab';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <SecurityTab
        dialogProps={{
          open: true,

          onClose: () => {}
        }}

        theme={{}}
        user={{}}
        userData={{}}

        openSnackbar={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
