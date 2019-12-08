import React, { Component } from 'react';

import PropTypes from 'prop-types';

import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);

      const eventId = Sentry.captureException(error);

      this.setState({
        eventId: eventId
      });
    });
  }

  render() {
    // Properties
    const { children } = this.props;

    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  // Properties
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
