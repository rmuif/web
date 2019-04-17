import React from 'react';

import ReactDOM from 'react-dom';

import ConfirmationDialog from './ConfirmationDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <ConfirmationDialog
        open={false}
        title="Title"
        contentText="Content"
        onClose={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
