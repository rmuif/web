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
    color: "#000000",
    icon: <AppleIcon />,
    name: "Apple"
  },
  {
    providerId: "facebook.com",
    color: "#3c5a99",
    icon: <FacebookBoxIcon />,
    name: "Facebook"
  },
  {
    providerId: "github.com",
    color: "#24292e",
    icon: <GitHubCircleIcon />,
    name: "GitHub"
  },
  {
    providerId: "google.com",
    color: "#4285f4",
    icon: <GoogleIcon />,
    name: "Google"
  },
  {
    providerId: "microsoft.com",
    color: "#f65314",
    icon: <MicrosoftIcon />,
    name: "Microsoft"
  },
  {
    providerId: "twitter.com",
    color: "#1da1f2",
    icon: <TwitterIcon />,
    name: "Twitter"
  },
  {
    providerId: "yahoo.com",
    color: "#410093",
    icon: <YahooIcon />,
    name: "Yahoo"
  }
];

export default authProviders;
