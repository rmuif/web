import React from 'react';

import ReactDOM from 'react-dom';

import ConfirmationDialog from './ConfirmationDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <ConfirmationDialog
        open={false}
        onClose={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
