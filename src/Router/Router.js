import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeContent from '../content/HomeContent';
import NotFoundContent from '../content/NotFoundContent';

class Router extends Component {
  render() {
    // Properties
    const { signedIn } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (<HomeContent signedIn={signedIn} />)} />
          <Route component={NotFoundContent} />
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  // Properties
  signedIn: PropTypes.bool.isRequired
};

export default Router;