import React from "react";

import ReactDOM from "react-dom";

import SettingsDialog from "./SettingsDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <SettingsDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      user={{
        metadata: {
          lastSignInTime: 0,
        },
      }}
      userData={{}}
      theme={{}}
      openSnackbar={() => {}}
      onDeleteAccountClick={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
