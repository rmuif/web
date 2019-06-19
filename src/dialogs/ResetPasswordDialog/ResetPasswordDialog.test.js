import React from 'react';

import ReactDOM from 'react-dom';

import ResetPasswordDialog from './ResetPasswordDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <ResetPasswordDialog
        open={false}
        isPerformingAuthAction={false}
        resetPassword={() => {}}
        onClose={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
