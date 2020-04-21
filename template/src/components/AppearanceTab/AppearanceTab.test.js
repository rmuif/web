import React from "react";

import ReactDOM from "react-dom";

import AppearanceTab from "./AppearanceTab";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <AppearanceTab
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
