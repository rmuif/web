# React + Material-UI + Firebase

[![Build Status](https://travis-ci.org/Phoqe/react-material-ui-firebase.svg?branch=master)](https://travis-ci.org/Phoqe/react-material-ui-firebase)
[![Discord](https://img.shields.io/discord/567707014361513995.svg)](https://discord.gg/y3EMyrN)
![GitHub repo size](https://img.shields.io/github/repo-size/Phoqe/react-material-ui-firebase.svg)
[![Website](https://img.shields.io/website/https/phoqe.me/react-material-ui-firebase.svg)](https://phoqe.me/react-material-ui-firebase)

This project is an application skeleton for a typical [React](https://reactjs.org) project. With [Create React App](https://facebook.github.io/create-react-app) at its core, you can use it to bootstrap your projects and development environment with the same tooling. It comes bundled with [Material-UI](https://material-ui.com), [Firebase](https://firebase.google.com), and [React Router](https://reacttraining.com/react-router).

<p align="center">
  <img src="https://user-images.githubusercontent.com/7033377/62852357-794cf800-bce9-11e9-8e0c-08774c616970.png">
</p>

## Features

There’s already a bunch of features included for instant web development gratification.

- Bootstrapped with Create React App, the same tooling works out-of-the-box
- Scaffolding incorporates Google Material Design principles through Material-UI
- Built on top of Firebase with Authentication, Cloud Firestore, Cloud Functions, Storage, and Performance Monitoring working from the start
- Robust routing with React Router including error handling
- Extensive mobile support with full-screen dialogs and [react-swipeable-views](https://react-swipeable-views.com) for tabs

For an exhaustive list you can visit the [Features page](https://github.com/Phoqe/react-material-ui-firebase/wiki/Features).

## Demo

https://phoqe.me/react-material-ui-firebase

## Get started

The project is up and running after just 4 commands.

### Clone the repository

The command `git clone` is a [Git](https://www.git-scm.com) command-line utility which is used to target an existing repository and create a clone, or copy of the target repository. The `<directory>` option is the name of a new directory to clone into, you can replace it with your project’s name. The “humanish” part of the source repository is used if no directory is explicitly given (`repo` for `/path/to/repo.git` and `foo` for `host.xz:foo/.git`).

```
git clone https://github.com/Phoqe/react-material-ui-firebase.git <directory>
```

### Install the dependencies

The command `cd`, also known as `chdir` (**ch**ange **dir**ectory), is a command-line OS shell command used to change the current working directory.

```
cd <directory>
```

The command `yarn install` is a [Yarn](https://yarnpkg.com) command-line utility which is used to install all dependencies for a project. This is most commonly used when you have just checked out code for a project, or when another developer on the project has added a new dependency that you need to pick up.

```
yarn install
```

### Run the app

The command `yarn start` is another Yarn command-line utility which is used to run the app in development mode. Open http://localhost:3000 to view it in the browser. The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

```
yarn start
```

## Make it yours

React + Material-UI + Firebase is a boilerplate for your own project. It wouldn’t make sense if you couldn’t customize it to the core.

### Change name and URL

Changing your project’s name can be tedious sometimes as it often involves changing the name of both files and directories along with a ton of hard-coded values. With this template, you can change your project’s name by modifying 4 files:

- **public/**
  - manifest.json
    - `name`
    - `short_name`
- .env
    - `REACT_APP_NAME`
- package.json
  - `name`
  - `homepage`

### Use your own Git repository

The command `git remote` is another Git command-line utility which is used to manage the set of repositories (“remotes”) whose branches you track. The options `rm origin` is used to remove the remote named `origin`. All remote-tracking branches and configuration settings for the remote are removed.

```
git remote rm origin
```

The options `add origin` adds a remote named `origin` for the repository at `<url>`.

```
git remote add origin <url>
```

The options `add upstream` adds a remote named `upstream` for the repository at `https://github.com/Phoqe/react-material-ui-firebase.git`.

```
git remote add upstream https://github.com/Phoqe/react-material-ui-firebase.git
```

The command `git push` is yet another Git command-line utility which is used to update remote refs using local refs, while sending objects necessary to complete the given refs.

```
git push -u origin master
```

### Deploy Firebase rules and functions

The command `npm install` is an [npm](https://www.npmjs.com) command-line utility which is used to install the dependencies in the local `node_modules` folder. In global mode (i.e., with `-g` or `--global` appended to the command), it installs the current package context as a global package. The Firebase CLI provides a variety of tools for managing, viewing, and deploying to Firebase projects.

```
npm install -g firebase-tools
```

The command `firebase login` is a [Firebase](https://firebase.google.com) command-line utility which is used to sign into Firebase using your Google account and connects your local machine to Firebase and grants you access to your Firebase projects.

```
firebase login
```

The command `firebase list` is another Firebase command-line utility which is used to print a list of all of your Firebase projects. Use it to test that authentication worked (and to list all of your Firebase projects), the displayed list should be the same as the Firebase projects listed in the [Firebase console](https://console.firebase.google.com).

```
firebase list
```

The command `firebase init` is yet another Firebase command-line utility which is used to set up a new Firebase project in the current directory. This command will create a `firebase.json` configuration file in the current directory.

```
firebase init
```

The command `firebase deploy` is also a Firebase command-line utility which is used to deploy code and assets from your project directory to your Firebase project.

```
firebase deploy --only firestore:rules,storage,functions
```

## Attribution

<a href="https://jetbrains.com">
  <img src="https://user-images.githubusercontent.com/7033377/64803713-a7925180-d58d-11e9-94a4-54bcdd9023e6.png" width="150">
</a>

The maintainers use [JetBrains](https://www.jetbrains.com)’ tools to maintain and develop new features for the project. Their [Open Source Support Program](https://www.jetbrains.com/community/opensource) gives us the ability to use their tools for free to improve upon this project.

<a href="https://browserstack.com">
  <img src="https://p14.zdusercontent.com/attachment/1015988/w1rTv9BV42bGKWAEdOOH0jyWu?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1j02V7lb9BSm4tAQIuOOMw.FFMfm49EsVQDC0GxjH8kTd4HpJjURmpA7sATf2zcuN07PZK6DMhREVEEXqgVEwwXfCHmnkpvgv5sYNXpUyiyAOvoO6eE_UcMnXjPC8a3q6fDLjJHzxLVRx93OBr_AFzAf6Gnt5s93rEnN1Fjvqsn7sRItZbgQQLZ_M_7xnl_QHyhpn3zYSFt35mTwObGggMaJ6mBpZNI-72SJKZtzoEPb1hNaM97MTUFEAbdxQL2n_DFieJFyNDkBNeIDHUmG4TFrmHhwucxv9j3V6UIJikDFS97CrueA-jUnkRS_HY-JDA.ti_ZX5qRJwKWcqUewhZGgA" width="150">
</a>

[BrowserStack](https://browserstack.com) is being used for its powerful suite of testing tools. With it we can test the project on multiple devices and browsers in real-time.

## License

React + Material-UI + Firebase is open-source software [licensed as MIT](https://github.com/Phoqe/react-material-ui-firebase/blob/master/LICENSE.md).
