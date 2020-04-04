import React from "react";

import ReactDOM from "react-dom";

import AlertDialog from "./AlertDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <AlertDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      contentText=""
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
