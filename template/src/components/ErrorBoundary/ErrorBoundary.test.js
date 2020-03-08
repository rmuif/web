import React from "react";

import ReactDOM from "react-dom";

import ErrorBoundary from "./ErrorBoundary";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ErrorBoundary children={[]} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
