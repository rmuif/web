import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeContent from '../content/HomeContent/HomeContent';
import NotFoundContent from '../content/NotFoundContent/NotFoundContent';

class Router extends Component {
  render() {
    // Properties
    const { isSignedIn } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (<HomeContent isSignedIn={isSignedIn} />)} />
          <Route component={NotFoundContent} />
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  // Properties
  isSignedIn: PropTypes.bool.isRequired
};

export default Router;