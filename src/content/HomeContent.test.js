import React from 'react';

import ReactDOM from 'react-dom';

import { MemoryRouter } from 'react-router-dom';

import HomeContent from './HomeContent';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <MemoryRouter>
        <HomeContent
          isSignedIn={false}
          title="q"
        />
      </MemoryRouter>
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
