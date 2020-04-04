import React from "react";

import ReactDOM from "react-dom";

import LinksTab from "./LinksTab";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <LinksTab
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      theme={{
        primaryColor: {
          id: "blue",
        },
        secondaryColor: {
          id: "red",
        },
        type: {
          id: "dark",
        },
      }}
      openSnackbar={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
