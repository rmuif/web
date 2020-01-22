import React from "react";

import AppleIcon from "mdi-material-ui/Apple";
import FacebookBoxIcon from "mdi-material-ui/FacebookBox";
import GitHubCircleIcon from "mdi-material-ui/GithubCircle";
import GoogleIcon from "mdi-material-ui/Google";
import MicrosoftIcon from "mdi-material-ui/Microsoft";
import TwitterIcon from "mdi-material-ui/Twitter";
import YahooIcon from "mdi-material-ui/Yahoo";

const authProviders = [
  {
    providerId: "apple.com",
    icon: <AppleIcon />,
    name: "Apple"
  },
  {
    providerId: "facebook.com",
    icon: <FacebookBoxIcon />,
    name: "Facebook"
  },
  {
    providerId: "github.com",
    icon: <GitHubCircleIcon />,
    name: "GitHub"
  },
  {
    providerId: "google.com",
    icon: <GoogleIcon />,
    name: "Google"
  },
  {
    providerId: "microsoft.com",
    icon: <MicrosoftIcon />,
    name: "Microsoft"
  },
  {
    providerId: "twitter.com",
    icon: <TwitterIcon />,
    name: "Twitter"
  },
  {
    providerId: "yahoo.com",
    icon: <YahooIcon />,
    name: "Yahoo"
  }
];

export default authProviders;
