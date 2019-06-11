import React from 'react';

import ReactDOM from 'react-dom';

import AppearanceTab from './AppearanceTab';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <AppearanceTab
        colors={[]}
        primaryColor=""
        secondaryColor=""
        type=""
        hasDeviatedFromDefaultSettings={false}
        onPrimaryColorChange={() => {}}
        onSecondaryColorChange={() => {}}
        onTypeChange={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
