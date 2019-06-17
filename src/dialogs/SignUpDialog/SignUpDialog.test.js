import React from 'react';

import ReactDOM from 'react-dom';

import SignUpDialog from './SignUpDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <SignUpDialog
        open={false}
        isPerformingAuthAction={false}
        signUp={() => {}}
        onClose={() => {}}
        onAuthProviderClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
