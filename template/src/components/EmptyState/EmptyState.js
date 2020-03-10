import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

function EmptyState(props) {
  let fontSize;
  let variant;

  switch (props.size) {
    case "small":
      fontSize = "h3.fontSize";
      variant = "h6";
      break;

    case "medium":
      fontSize = "h2.fontSize";
      variant = "h5";
      break;

    case "large":
      fontSize = "h1.fontSize";
      variant = "h4";
      break;

    default:
      fontSize = "h2.fontSize";
      variant = "h5";
      break;
  }

  if (props.type === "page") {
    return (
      <Box
        style={{ transform: "translate(-50%, -50%)" }}
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
      >
        {props.icon && (
          <Box clone color="text.secondary" fontSize={fontSize}>
            {props.icon}
          </Box>
        )}

        {props.title && (
          <Typography color="textSecondary" variant={variant}>
            {props.title}
          </Typography>
        )}

        {props.description && (
          <Typography color="textSecondary" variant="body1">
            {props.description}
          </Typography>
        )}
      </Box>
    );
  }

  if (props.type === "card") {
    return (
      <Box padding={props.padding} textAlign="center">
        {props.icon && (
          <Box clone color="text.secondary" fontSize={fontSize}>
            {props.icon}
          </Box>
        )}

        {props.title && (
          <Typography color="textSecondary" variant={variant}>
            {props.title}
          </Typography>
        )}

        {props.description && (
          <Typography color="textSecondary" variant="body1">
            {props.description}
          </Typography>
        )}
      </Box>
    );
  }

  return null;
}

EmptyState.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2
};

EmptyState.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  illustration: PropTypes.element,
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string
};

export default EmptyState;
