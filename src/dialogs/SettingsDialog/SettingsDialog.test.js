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
        isPerformingAuthAction={false}
        isVerifyingEmailAddress={false}
        colors={[]}
        primaryColor=""
        secondaryColor=""
        type=""
        onClose={() => {}}
        onAddAvatarClick={() => {}}
        onChangeAvatarClick={() => {}}
        onAddDisplayNameClick={() => {}}
        onChangeDisplayNameClick={() => {}}
        onAddEmailAddressClick={() => {}}
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
