import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter, Route } from "react-router-dom";

import UserContent from "./UserContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Route path="/user/test">
        <UserContent />
      </Route>
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
