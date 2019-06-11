import React from 'react';

import ReactDOM from 'react-dom';

import Bar from './Bar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <Bar
        title=""
        isPerformingAuthAction
        isSignedIn={false}
        onSettingsClick={() => {}}
        onSignOutClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
