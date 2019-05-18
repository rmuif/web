import React from 'react';

import ReactDOM from 'react-dom';

import WelcomeDialog from './WelcomeDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    (
      <WelcomeDialog
        open={false}

        title=""
        user={{}}
        isPerformingAuthAction={false}

        onClose={() => {}}

        onCancelClick={() => {}}
        onVerifyClick={() => {}}
      />
    ),
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
