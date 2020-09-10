import React from "react";

import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import Bar from "./Bar";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <Bar
        title=""
        performingAction={false}
        onAboutClick={() => {}}
        onSettingsClick={() => {}}
        onSignOutClick={() => {}}
      />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
