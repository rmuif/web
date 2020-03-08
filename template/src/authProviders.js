import React from "react";

import { Apple as AppleIcon } from "mdi-material-ui";
import { FacebookBox as FacebookBoxIcon } from "mdi-material-ui";
import { GithubCircle as GitHubCircleIcon } from "mdi-material-ui";
import { Google as GoogleIcon } from "mdi-material-ui";
import { Microsoft as MicrosoftIcon } from "mdi-material-ui";
import { Twitter as TwitterIcon } from "mdi-material-ui";
import { Yahoo as YahooIcon } from "mdi-material-ui";

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
