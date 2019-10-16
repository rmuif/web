import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeContent from '../HomeContent';
import NotFoundContent from '../NotFoundContent';

class Router extends Component {
  render() {
    // Properties
    const { signedIn } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <HomeContent signedIn={signedIn} />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.defaultProps = {
  signedIn: false
};

Router.propTypes = {
  // Properties
  signedIn: PropTypes.bool.isRequired
};

export default Router;
