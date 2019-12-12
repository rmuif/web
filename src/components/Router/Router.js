import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeContent from '../HomeContent';
import NotFoundContent from '../NotFoundContent';

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <HomeContent
              user={user}

              openSnackbar={openSnackbar}
            />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;
