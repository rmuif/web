import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import { Home as HomeIcon } from "@material-ui/icons";

import authentication from "../../services/authentication";

import EmptyState from "../EmptyState";

import { ReactComponent as HomeIllustration } from "../../illustrations/home.svg";

class HomeContent extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then(value => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          );
        })
        .catch(reason => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/expired-action-code":
            case "auth/invalid-email":
            case "auth/user-disabled":
              this.props.openSnackbar(message);
              break;

            default:
              this.props.openSnackbar(message);
              return;
          }
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    // Properties
    const { user } = this.props;

    if (user) {
      return <EmptyState icon={<HomeIcon />} title="Home" />;
    }

    return (
      <EmptyState
        image={<HomeIllustration />}
        title="RMUIF"
        description="Supercharged version of Create React App with all the bells and whistles"
      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomeContent.propTypes = {
  // Properties
  user: PropTypes.object
};

export default withRouter(HomeContent);
