import React from "react";

import { Apple as AppleIcon } from "mdi-material-ui";
import { Facebook as FacebookIcon } from "mdi-material-ui";
import { Github as GitHubIcon } from "mdi-material-ui";
import { Google as GoogleIcon } from "mdi-material-ui";
import { Microsoft as MicrosoftIcon } from "mdi-material-ui";
import { Twitter as TwitterIcon } from "mdi-material-ui";
import { Yahoo as YahooIcon } from "mdi-material-ui";

const authProviders = [
  {
    id: "apple.com",
    color: "#000000",
    icon: <AppleIcon />,
    name: "Apple",
  },
  {
    id: "facebook.com",
    color: "#3c5a99",
    icon: <FacebookIcon />,
    name: "Facebook",
  },
  {
    id: "github.com",
    color: "#24292e",
    icon: <GitHubIcon />,
    name: "GitHub",
    scopes: ["repo"],
  },
  {
    id: "google.com",
    color: "#4285f4",
    icon: <GoogleIcon />,
    name: "Google",
  },
  {
    id: "microsoft.com",
    color: "#f65314",
    icon: <MicrosoftIcon />,
    name: "Microsoft",
  },
  {
    id: "twitter.com",
    color: "#1da1f2",
    icon: <TwitterIcon />,
    name: "Twitter",
  },
  {
    id: "yahoo.com",
    color: "#410093",
    icon: <YahooIcon />,
    name: "Yahoo",
  },
];

export default authProviders;
