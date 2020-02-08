import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import UserContent from "./UserContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <UserContent />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
