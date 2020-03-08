import React from "react";

import ReactDOM from "react-dom";

import Router from "./Router";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<Router roles={[]} openSnackbar={() => {}} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
