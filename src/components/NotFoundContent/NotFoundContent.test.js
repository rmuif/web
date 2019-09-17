import React from 'react';

import ReactDOM from 'react-dom';

import { MemoryRouter } from 'react-router-dom';

import NotFoundContent from './NotFoundContent';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <MemoryRouter>
        <NotFoundContent />
      </MemoryRouter>
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
