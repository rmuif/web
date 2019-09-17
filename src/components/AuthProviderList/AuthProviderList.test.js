import React from 'react';

import ReactDOM from 'react-dom';

import AuthProviderList from './AuthProviderList';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <AuthProviderList
        onAuthProviderClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
