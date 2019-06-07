import React from 'react';

import ReactDOM from 'react-dom';

import InputDialog from './InputDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <InputDialog
        open={false}

        onClose={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
