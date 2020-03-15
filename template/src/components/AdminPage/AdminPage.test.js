import React from "react";

import ReactDOM from "react-dom";

import AdminPage from "./AdminPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<AdminPage />, div);

  ReactDOM.unmountComponentAtNode(div);
});
