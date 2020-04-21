import React from "react";

import ReactDOM from "react-dom";

import SimpleDialog from "./SimpleDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <SimpleDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      content={<div></div>}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
