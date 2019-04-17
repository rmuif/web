import React from 'react';

import ReactDOM from 'react-dom';

import SettingsDialog from './SettingsDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <SettingsDialog
        open={false}
        user={{}}
        isVerifyingEmailAddress={false}
        colors={[]}
        types={[]}
        primaryColor=""
        secondaryColor=""
        type=""
        onClose={() => {}}
        onVerifyEmailAddressClick={() => {}}
        onPrimaryColorChange={() => {}}
        onSecondaryColorChange={() => {}}
        onTypeChange={() => {}}
        onResetClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
