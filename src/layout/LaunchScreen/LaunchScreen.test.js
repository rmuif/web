import React from 'react';

import ReactDOM from 'react-dom';

import LaunchScreen from './LaunchScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <LaunchScreen />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
