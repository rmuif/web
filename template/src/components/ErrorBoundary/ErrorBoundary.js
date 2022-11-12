import React, { useState, useEffect } from "react"; 
import PropTypes from "prop-types"; 
import * as Sentry from "@sentry/browser"; 
import EmptyState from "../EmptyState"; 
import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg"; 

function ErrorBoundary() {

  //useState 
  const [hasError, setHasError] = useState(false); 
  const [eventId, setEventId] = useState(null); 

  useEffect((error, errorInfo) => {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo); 

      const eventId = Sentry.captureException(error); 

      setEventId(eventId); 
    })
  }) 

  //Properties 
  const { children } = this.props; 

  if (hasError) {
    return (
      <EmptyState
        images={<ErrorIllustration />}
        title="Something went wrong" 
        description="The app failed to load"
      /> 
    ); 
  }

  return children; 
}

ErrorBoundary.propTypes = {
  //Properties 
  children: PropTypes.array.isRequired, 
}; 

export default ErrorBoundary; 
