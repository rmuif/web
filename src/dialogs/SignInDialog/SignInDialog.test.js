import React from 'react';

import ReactDOM from 'react-dom';

import SignInDialog from './SignInDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <SignInDialog
        open={false}
        isPerformingAuthAction={false}
        signIn={() => {}}
        onClose={() => {}}
        onAuthProviderClick={() => {}}
        onResetPasswordClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
