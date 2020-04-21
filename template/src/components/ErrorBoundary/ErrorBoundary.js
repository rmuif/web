import React, { Component } from "react";

import PropTypes from "prop-types";

import * as Sentry from "@sentry/browser";

import EmptyState from "../EmptyState";

import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      eventId: null,
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
        eventId: eventId,
      });
    });
  }

  render() {
    // Properties
    const { children } = this.props;

    const { hasError } = this.state;

    if (hasError) {
      return (
        <EmptyState
          image={<ErrorIllustration />}
          title="Something went wrong"
          description="The app failed to load"
        />
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  // Properties
  children: PropTypes.array.isRequired,
};

export default ErrorBoundary;
