import React from "react";

import ReactDOM from "react-dom";

import SignInDialog from "./SignInDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <SignInDialog
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      resetPassword={() => {}}
      signIn={() => {}}
      openSnackbar={() => {}}
      onAuthProviderClick={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
