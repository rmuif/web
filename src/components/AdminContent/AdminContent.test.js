import React from "react";

import ReactDOM from "react-dom";

import AdminContent from "./AdminContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<AdminContent />, div);

  ReactDOM.unmountComponentAtNode(div);
});
