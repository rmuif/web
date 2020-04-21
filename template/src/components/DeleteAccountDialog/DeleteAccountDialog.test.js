import React from "react";

import ReactDOM from "react-dom";

import DeleteAccountDialog from "./DeleteAccountDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <DeleteAccountDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      performingAction={false}
      userData={{}}
      deleteAccount={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
