import React from "react";

import ReactDOM from "react-dom";

import DialogHost from "./DialogHost";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <DialogHost
      performingAction={false}
      theme={{}}
      dialogs={{
        aboutDialog: {
          dialogProps: {
            open: false,
          },

          props: {
            theme: {},
          },
        },
        signUpDialog: {},
        signInDialog: {},
        settingsDialog: {},
        signOutDialog: {},
      }}
      openSnackbar={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
