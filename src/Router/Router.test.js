import React from 'react';

import ReactDOM from 'react-dom';

import Router from './Router';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <Router
        signedIn={false}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});