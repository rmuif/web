import React from "react";

import ReactDOM from "react-dom";

import AboutDialog from "./AboutDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <AboutDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
