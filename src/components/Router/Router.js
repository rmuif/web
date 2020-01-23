import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomeContent from "../HomeContent";
import AuthContent from "../AuthContent";
import AdminContent from "../AdminContent";
import NotFoundContent from "../NotFoundContent";

class Router extends Component {
  render() {
    // Properties
    const { user, roles } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <HomeContent user={user} openSnackbar={openSnackbar} />
          </Route>

          <Route path="/auth">
            {user ? <AuthContent /> : <Redirect to="/" />}
          </Route>

          <Route path="/admin">
            {user && roles.includes("admin") ? (
              <AdminContent />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;
