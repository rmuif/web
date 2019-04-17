import React from 'react';

import ReactDOM from 'react-dom';

import AccountTab from './AccountTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const user = {
    metadata: {
      lastSignInTime: 0
    }
  };

  ReactDOM.render(
    (
      <AccountTab
        user={user}
        isVerifyingEmailAddress={false}
        onVerifyEmailAddressClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
