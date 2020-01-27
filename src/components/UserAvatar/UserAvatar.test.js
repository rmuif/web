import React from "react";

import ReactDOM from "react-dom";

import UserAvatar from "./UserAvatar";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<UserAvatar user={{}} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
