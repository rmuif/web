import React from "react";

import ReactDOM from "react-dom";

import AuthContent from "./AuthContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<AuthContent />, div);

  ReactDOM.unmountComponentAtNode(div);
});
