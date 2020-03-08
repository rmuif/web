import React from "react";

import ReactDOM from "react-dom";

import UserCard from "./UserCard";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<UserCard user={{}} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
