import React, { useEffect } from "react"; 
import { PropTypes } from "prop-types"; 
import { withRouter } from "react-router-dom"; 
import { auth } from "../../firebase"; 
import authentication from "../../services/authentication"; 
import EmptyState from "../EmptyState"; 

import { ReactComponent as CabinIllustration } from "../../illustrations/cabin.svg"; 
import { ReactComponent as InsertBlackIllustration } from "../../illustrations/insert-black.svg"; 

function HomePage() {
  
  useEffect(() => {
    signInWithEmailLink(); 
  }, []); 

  const signInWithEmailLink = () => {
    const { user } = this.props; 

    if (user) {
      return; 
    }

    const emaillink = window.location.href; 

    if (!emaillink) {
      return; 
    }

    if (auth.isSignInWithEmailLink(emaillink)) {
      let emailAddress = localStorage.getItem("emailAddress"); 

      if (!emailAddress) {
        this.props.history.push("/"); 

        return; 
      }

      authentication
        .signInWithEmailLink(emailAddress, emaillink)
        .then((value) => {
          const user = value.user; 
          const displayName = user.displayName; 
          const emailAddress = user.email; 

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          ); 
        })
        .catch((reason) => {
          const code = reason.code; 
          const message = reason.message; 

          switch(code) {
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

  const { user } = this.props; 

  if (user) {
    return (
      <EmptyState
        image={<CabinIllustration />}
        title="Home"
        description="This is the home page. You can edit it from HomePage.js."
    /> 
    ); 
  }

  return (
    <EmptyState
      image={<InsertBlackIllustration />}
      title="RMUIF"
      description="Supercharged version of Create React App with all the bells and whistles."
  /> 
  ); 
}

export default withRouter(HomePage); 
