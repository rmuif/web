import React, { Component } from "react";

import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class EmptyState extends Component {
  render() {
    // Properties
    const { type, size, padding, icon, title, description } = this.props;

    let fontSize;
    let variant;

    if (size === "small") {
      fontSize = "h3.fontSize";
      variant = "h6";
    } else if (size === "medium") {
      fontSize = "h2.fontSize";
      variant = "h5";
    } else if (size === "big") {
      fontSize = "h1.fontSize";
      variant = "h4";
    }

    if (type === "content") {
      return (
        <Box
          style={{ transform: "translate(-50%, -50%)" }}
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
        >
          {icon && (
            <Box clone color="text.secondary" fontSize={fontSize}>
              {icon}
            </Box>
          )}

          {title && (
            <Typography color="textSecondary" variant={variant}>
              {title}
            </Typography>
          )}

          {description && (
            <Typography color="textSecondary" variant="body1">
              {description}
            </Typography>
          )}
        </Box>
      );
    }

    if (type === "card") {
      return (
        <Box padding={padding} textAlign="center">
          {icon && (
            <Box clone color="text.secondary" fontSize={fontSize}>
              {icon}
            </Box>
          )}

          {title && (
            <Typography color="textSecondary" variant={variant}>
              {title}
            </Typography>
          )}

          {description && (
            <Typography color="textSecondary" variant="body1">
              {description}
            </Typography>
          )}
        </Box>
      );
    }

    return null;
  }
}

EmptyState.defaultProps = {
  type: "content",
  size: "medium",
  padding: 2
};

EmptyState.propTypes = {
  // Properties
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  padding: PropTypes.number,
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string
};

export default EmptyState;
