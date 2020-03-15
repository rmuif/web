import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import HomePage from "./HomePage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <HomePage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
